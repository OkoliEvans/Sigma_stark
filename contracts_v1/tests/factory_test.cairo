use core::result::ResultTrait;
use core::{option::OptionTrait, debug::PrintTrait};
use snforge_std::{declare, ContractClassTrait, start_prank, stop_prank, start_warp};
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
    let token = create_token();
    let (caller, address_this, voting_classhash) = get_addresses();


    // contract setup
    let contract = declare(name);
    let mut calldata = ArrayTrait::new();
    voting_classhash.serialize(ref calldata);
    token.serialize(ref calldata);
    caller.serialize(ref calldata);

    // Precalculate the address to obtain the contract address before the constructor call (deploy) itself
    let contract_address = contract.precalculate_address(@calldata);
    let deployed_contract = contract.deploy(@calldata).unwrap();
    return deployed_contract;
}

fn create_token() -> ContractAddress {
    let caller: ContractAddress = 0x002e9273b846dcfa1114caf1e830c603b12fe37e9a6e5cd79a787fb326021283
        .try_into()
        .unwrap();
    let name = 'Sigma';
    let symbol = 'SMX';
    let decimal = 18;
    let init_supply:u256 = 10000000;
    let mut calldata = ArrayTrait::new();
    let address_this: ContractAddress = get_contract_address();

    name.serialize(ref calldata);
    symbol.serialize(ref calldata);
    decimal.serialize(ref calldata);
    init_supply.serialize(ref calldata);
    caller.serialize(ref calldata);

    let token_class = declare('ERC20');
    let token_addr = token_class.deploy(@calldata).unwrap();
    token_addr
}

#[test]
fn test_create_SMX() {
   let SMX = create_token();

    let SMXDispatcher = IERC20Dispatcher { contract_address: SMX };
    let total_supply = SMXDispatcher.total_supply();
    assert(total_supply == 10_000_000, 'not total_supply');
}


fn get_addresses() -> (ContractAddress, ContractAddress, ClassHash) {
    let caller: ContractAddress = 0x002e9273b846dcfa1114caf1e830c603b12fe37e9a6e5cd79a787fb326021283
        .try_into()
        .unwrap();

    let address_this: ContractAddress = get_contract_address();
    let voting_class = declare('Voting');
    let voting_classhash: ClassHash = voting_class.class_hash;

    let token: ContractAddress = 0x062df1f543b13e0da5abd2a90910fa7a2fe44c6a5f70849b298c6b2a219783a1
        .try_into()
        .unwrap();
    return (caller, address_this, voting_classhash);
}


// #[fork("goerli")]
#[test]
fn test_create_election() {
    let token = create_token();
    let (caller, address_this, voting_classhash) = get_addresses();
    let token_supply = 1;
    let vote_id = 145;
    let contest = 'Presidential';
    let start = 1701560434;
    let end: u64 = 1701733234;
    start.print();

    let contract_address = deploy_contract('factory', caller);
    let factory_dispatcher = IVoteFactoryTraitDispatcher { contract_address };

    start_warp(contract_address, 170956043);
    let election_1 = factory_dispatcher.create_election(vote_id, contest, start, token_supply);
    election_1.print();

    // let id = factory_dispatcher.return_election_id(election_1);
    assert(election_1 == token, 'Incorrect num of elections');
}
