use core::{ option::OptionTrait, debug::PrintTrait};
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
   
    // let voting_classhash2 = 0x07ddef21abec53cfe5ec9908788b8d9eb11bb79650d92fdb4b6cd0ccfc14cb5c;

    let token: ContractAddress = 0x062df1f543b13e0da5abd2a90910fa7a2fe44c6a5f70849b298c6b2a219783a1
        .try_into()
        .unwrap();
    let moderator = 0x0719947d6faa0cb9a9794d6442947cc30e2aa198e92f3fb30f875354e167f4e7.try_into().unwrap();

    let contract = declare(name);
    
    let (caller, token_addr, address_this, voting_classhash) = get_addresses();
    
    let mut calldata = ArrayTrait::new();
    voting_classhash.serialize(ref calldata);
    token_addr.serialize(ref calldata);

    // Precalculate the address to obtain the contract address before the constructor call (deploy) itself
    let contract_address = contract.precalculate_address(@calldata);

    start_prank(contract_address, moderator);
    let deployed_contract = contract.deploy(@calldata).unwrap();
    stop_prank(contract_address);

    return deployed_contract;
}


fn get_addresses() -> (ContractAddress, ContractAddress, ContractAddress, ClassHash) {
    let caller: ContractAddress = 0x0719947d6faa0cb9a9794d6442947cc30e2aa198e92f3fb30f875354e167f4e7
        .try_into()
        .unwrap();
    let token_class = declare('ERC20');
    let token_addr = deploy_contract('ERC20', get_contract_address());

    let voting_class = declare('Voting');
    let voting_classhash: ClassHash = voting_class.class_hash;
    
    let token: ContractAddress = 0x062df1f543b13e0da5abd2a90910fa7a2fe44c6a5f70849b298c6b2a219783a1
        .try_into()
        .unwrap();
    let address_this: ContractAddress = get_contract_address();
    return (caller, token_addr, address_this, voting_classhash);
}


// #[test]
// fn test_deploy() {
//     let (caller, token, address_this) = get_addresses();
//     let contract_address = deploy_contract('factory', address_this);
//     let factory_dispatcher = IVoteFactoryTraitDispatcher { contract_address };
//     assert(!contract_address.is_zero(), 'zero address');
// }

// #[fork("goerli")]
#[test]
fn test_create_election() {
    let (caller, token, address_this, voting_classhash) = get_addresses();
    let token_supply = 1;
    let vote_id = 145;
    let contest = 'Presidential election 2023';
    let start = 1701560434;
    let end: u64 = 1701733234;

    let contract_address = deploy_contract('factory', address_this);
    let factory_dispatcher = IVoteFactoryTraitDispatcher { contract_address };
    start.print();

    start_warp(contract_address, 170956043);
    let election_1 = factory_dispatcher
        .create_election(vote_id, contest, start, token_supply);
    election_1.print();

    // let id = factory_dispatcher.return_election_id(election_1);
    assert(election_1 == token, 'Incorrect num of elections');
}
