use starknet::ContractAddress;
use array::ArrayTrait;

#[starknet::interface]
trait IVoteFactoryTrait<TContractState> {
    fn create_election(
        ref self: TContractState,
        vote_id: felt252,
        name: felt252,
        symbol: felt252,
        token_uri: felt252,
        contest: felt252,
        start: u64,
        token: ContractAddress,
        token_supply: u256
    ) -> ContractAddress;

    fn return_election_id(self: @TContractState, voting_addr: ContractAddress) -> felt252;
    fn change_moderator(ref self: TContractState, new_mod: ContractAddress);
    fn return_elections(self: @TContractState, vote_id: felt252) -> Array<ContractAddress>;
}
