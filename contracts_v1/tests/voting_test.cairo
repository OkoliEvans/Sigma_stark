use core::result::ResultTrait;
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


fn deploy_contract(
    name: felt252,
    overseer: ContractAddress,
    election_id: felt252,
    token_name: felt252,
    symbol: felt252,
    uri: felt252,
    contest: felt252,
    moderator: ContractAddress,
    start: u64,
    _token: ContractAddress
) -> ContractAddress {
    let contract = declare(name);
    let mut calldata = ArrayTrait::new();
    overseer.serialize(ref calldata);
    election_id.serialize(ref calldata);
    token_name.serialize(ref calldata);
    symbol.serialize(ref calldata);
    uri.serialize(ref calldata);
    contest.serialize(ref calldata);
    moderator.serialize(ref calldata);
    start.serialize(ref calldata);
    _token.serialize(ref calldata);

    let contract_address = contract.precalculate_address(@calldata);

    start_prank(contract_address, overseer.try_into().unwrap());
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
fn test_add_candidate() {
    let (caller, token, address_this) = get_addresses();
    let age = 50;
    let address_caller = 0x06754dbca5be2db479ddeeab1a743f3d950854ac23ad4e0d43f96b4c57dde73d;
    let fullname = 'Olugbenga Daniel';
    let position = 'President';
    let description = 'Outspoken, humble';
    let start = 1701560434;

    let contract_address = deploy_contract('Voting', address_this, 'NPE21', 'NigPE2023', 'INEC23', 'qicdiiid', 'Presidential election', caller, start, token);
    let voting_dispatcher = IVotingTraitDispatcher {contract_address};
    let overseer: ContractAddress = voting_dispatcher.get_overseer();

    assert(overseer == address_this, 'Unexpected overseer');
}