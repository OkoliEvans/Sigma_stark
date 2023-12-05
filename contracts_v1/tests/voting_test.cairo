use core::result::ResultTrait;
use core::option::OptionTrait;
use snforge_std::{
    declare, ContractClassTrait, start_prank, stop_prank, start_warp, stop_warp, env::var
};
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
    contest: felt252,
    moderator: ContractAddress,
    start: u64,
    _token: ContractAddress
) -> ContractAddress {
    let contract = declare(name);
    let mut calldata = ArrayTrait::new();
    overseer.serialize(ref calldata);
    election_id.serialize(ref calldata);
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
    let address_caller = 0x044c233c3c8092CEa7921EA9E748ec79696554047652B9e74Dc3295734e54DB5
        .try_into()
        .unwrap();
    let candidate_addr = 0x06754dbca5be2db479ddeeab1a743f3d950854ac23ad4e0d43f96b4c57dde73d
        .try_into()
        .unwrap();
    let fullname = 'Olugbenga Daniel';
    let position = 'President';
    let description = 'Outspoken, humble';
    let start = 1701560434;

    let contract_address = deploy_contract(
        'Voting', address_caller, 'NPE21', 'Presidential election', caller, start, token
    );
    let voting_dispatcher = IVotingTraitDispatcher { contract_address };

    start_prank(contract_address, address_caller);
    voting_dispatcher.add_candidate(age, candidate_addr, fullname, position, description);
    stop_prank(contract_address);

    let total_candidates = voting_dispatcher.get_total_candidates();
    assert(total_candidates == 1, 'incorrect candidates num');
}

#[test]
fn test_remove_candidate() {
    let address_overseer = 0x044c233c3c8092CEa7921EA9E748ec79696554047652B9e74Dc3295734e54DB5
        .try_into()
        .unwrap();
    let (caller, token, address_this) = get_addresses();
    let start = 1701560434;
    let contract_address = deploy_contract(
        'Voting', address_overseer, 'NPE21', 'Presidential election', caller, start, token
    );
    let voting_dispatcher = IVotingTraitDispatcher { contract_address };
    let candidate_addr = 0x06754dbca5be2db479ddeeab1a743f3d950854ac23ad4e0d43f96b4c57dde73d
        .try_into()
        .unwrap();
    let fullname = 'Olugbenga Daniel';
    let position = 'President';
    let description = 'Outspoken, humble';

    start_prank(contract_address, address_overseer);
    voting_dispatcher.add_candidate(67, candidate_addr, fullname, position, description);
    stop_prank(contract_address);

    start_prank(contract_address, address_overseer);
    voting_dispatcher.remove_candidate(candidate_addr);
    stop_prank(contract_address);

    let total_candidates = voting_dispatcher.get_total_candidates();
    assert(total_candidates == 0, 'incorrect candidates num');
}

#[test]
#[fork("goerli")]
fn test_verify() {
    let (caller, token, address_this) = get_addresses();
    let address_caller = 0x044c233c3c8092CEa7921EA9E748ec79696554047652B9e74Dc3295734e54DB5
        .try_into()
        .unwrap();

    let start = 1701560434;
    let contract_address = deploy_contract(
        'Voting', address_caller, 'NPE21', 'Presidential election', caller, start, token
    );
    let voting_dispatcher = IVotingTraitDispatcher { contract_address };
    let IERC20 = IERC20Dispatcher { contract_address: token };

    voting_dispatcher.verify('NPE21');

    assert(IERC20.balance_of(caller) == 1, 'SBT not transferred');
}

#[test]
#[fork("goerli")]
fn test_vote() {
    let address_overseer = 0x044c233c3c8092CEa7921EA9E748ec79696554047652B9e74Dc3295734e54DB5
        .try_into()
        .unwrap();
    let (caller, token, address_this) = get_addresses();
    let start = 1709560434;
    let end = 1711560434;
    let contract_address = deploy_contract(
        'Voting', address_overseer, 'NPE21', 'Presidential election', caller, start, token
    );
    let voting_dispatcher = IVotingTraitDispatcher { contract_address };
    let candidate_addr = 0x06754dbca5be2db479ddeeab1a743f3d950854ac23ad4e0d43f96b4c57dde73d
        .try_into()
        .unwrap();

    voting_dispatcher.verify('NPE21');

    start_prank(contract_address, address_overseer);
    start_warp(contract_address, 17095604346);
    voting_dispatcher.start_vote(end);
    stop_prank(contract_address);

    voting_dispatcher.vote(candidate_addr);

    let total_votes = voting_dispatcher.get_total_votes();
    assert(total_votes == 1, 'Incorrect num of votes');
}

#[test]
#[fork("goerli")]
#[should_panic(expected: ('Voter not verified',))]
fn test_vote_backdoor() {
    let fullname = 'Olugbenga Daniel';
    let position = 'President';
    let description = 'Outspoken, humble';
    let address_overseer = 0x044c233c3c8092CEa7921EA9E748ec79696554047652B9e74Dc3295734e54DB5
        .try_into()
        .unwrap();
    let (caller, token, address_this) = get_addresses();
    let start = 1709560434;
    let end = 1711560434;
    let contract_address = deploy_contract(
        'Voting', address_overseer, 'NPE21', 'Presidential election', caller, start, token
    );
    let voting_dispatcher = IVotingTraitDispatcher { contract_address };
    let candidate_addr = 0x06754dbca5be2db479ddeeab1a743f3d950854ac23ad4e0d43f96b4c57dde73d
        .try_into()
        .unwrap();

    start_prank(contract_address, address_overseer);
    voting_dispatcher.add_candidate(67, candidate_addr, fullname, position, description);
    start_warp(contract_address, 17095604346);
    voting_dispatcher.start_vote(end);
    stop_prank(contract_address);

    voting_dispatcher.vote(candidate_addr);

    let total_votes = voting_dispatcher.get_total_votes();
    assert(total_votes == 0, 'Incorrect num of votes');
}


#[test]
#[fork("goerli")]
#[should_panic(expected: ('verify unsuccessful',))]
fn test_verify_faux() {
    let (caller, token, address_this) = get_addresses();
    let address_caller = 0x044c233c3c8092CEa7921EA9E748ec79696554047652B9e74Dc3295734e54DB5
        .try_into()
        .unwrap();

    let start = 1701560434;
    let contract_address = deploy_contract(
        'Voting', address_caller, 'NPE21', 'Presidential election', caller, start, token
    );
    let voting_dispatcher = IVotingTraitDispatcher { contract_address };
    let IERC20 = IERC20Dispatcher { contract_address: token };

    voting_dispatcher.verify('NPE21');

    assert(IERC20.balance_of(caller) == 0, 'SBT really transferred');
}

#[test]
#[fork("goerli")]
#[should_panic(expected: ('Vote not started',))]
fn test_vote_faux() {
    let address_overseer = 0x044c233c3c8092CEa7921EA9E748ec79696554047652B9e74Dc3295734e54DB5
        .try_into()
        .unwrap();
    let (caller, token, address_this) = get_addresses();
    let start = 1709560434;
    let end = 1711560434;
    let contract_address = deploy_contract(
        'Voting', address_overseer, 'NPE21', 'Presidential election', caller, start, token
    );
    let voting_dispatcher = IVotingTraitDispatcher { contract_address };
    let candidate_addr = 0x06754dbca5be2db479ddeeab1a743f3d950854ac23ad4e0d43f96b4c57dde73d
        .try_into()
        .unwrap();

    voting_dispatcher.vote(candidate_addr);

    let total_votes = voting_dispatcher.get_total_votes();
    assert(total_votes == 0, 'Rigged');
}
