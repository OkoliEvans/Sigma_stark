use core::option::OptionTrait;
use snforge_std::{declare, ContractClassTrait, start_prank, stop_prank, start_warp, env::var};
use array::ArrayTrait;
use serde::Serde;
use traits::TryInto;
use starknet::{ContractAddress, get_caller_address, ClassHash, Zeroable, get_contract_address};
use starknet::Felt252TryIntoContractAddress;
use contracts_v1::factory_interface::{
    IVoteFactoryTraitDispatcher, IVoteFactoryTraitDispatcherTrait
};
use snforge_std::cheatcodes::contract_class::get_class_hash;
use contracts_v1::voting_interface::{IVotingTraitDispatcher, IVotingTraitDispatcherTrait};
use contracts_v1::sigma::{IERC20Dispatcher, IERC20DispatcherTrait};


fn deploy_contract(name: felt252, owner: ContractAddress) -> ContractAddress {
    let voting_class = declare('Voting');
    let voting_classhash: ClassHash = voting_class.class_hash;
    let token: ContractAddress = 0x01966be6e5ea707257fc8ac10a7900247941d45f29cf83cd6a67f08126ecdf93
        .try_into()
        .unwrap();
    let moderator = 0x0719947d6faa0cb9a9794d6442947cc30e2aa198e92f3fb30f875354e167f4e7.try_into().unwrap();

    let contract = declare(name);
    let mut calldata = ArrayTrait::new();
    voting_classhash.serialize(ref calldata);
    token.serialize(ref calldata);

    // Precalculate the address to obtain the contract address before the constructor call (deploy) itself
    let contract_address = contract.precalculate_address(@calldata);

    start_prank(contract_address, moderator);
    let deployed_contract = contract.deploy(@calldata).unwrap();
    stop_prank(contract_address);

    deployed_contract
}


fn get_addresses() -> (ContractAddress, ContractAddress, ContractAddress,) {
    let caller: ContractAddress = 0x0719947d6faa0cb9a9794d6442947cc30e2aa198e92f3fb30f875354e167f4e7
        .try_into()
        .unwrap();
    let token: ContractAddress = 0x01966be6e5ea707257fc8ac10a7900247941d45f29cf83cd6a67f08126ecdf93
        .try_into()
        .unwrap();
    let address_this: ContractAddress = get_contract_address();
    return (caller, token, address_this);
}


#[test]
fn test_deploy() {
    let (caller, token, address_this) = get_addresses();
    let contract_address = deploy_contract('factory', address_this);
    let factory_dispatcher = IVoteFactoryTraitDispatcher { contract_address };
    assert(!contract_address.is_zero(), 'zero address');
}

#[test]
fn test_create_election() {
    let (caller, token, address_this) = get_addresses();
    let contract_address = deploy_contract('factory', address_this);
    let factory_dispatcher = IVoteFactoryTraitDispatcher { contract_address };
    let token_supply = 1_000_000_000;
    let vote_id = 145;
    let contest = 'Presidential election 2023';
    let start = 1701560434;
    let end: u64 = 1701733234;


    let election_1 = factory_dispatcher
        .create_election(vote_id, contest, start, token, token_supply);
    
    let id = factory_dispatcher.return_election_id(election_1);
    assert(id == 145, 'Incorrect num of elections');
}
