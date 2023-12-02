use starknet::ContractAddress;

#[starknet::interface]
trait IVotingTrait<TContractState> {
    fn get_total_votes(self: @TContractState) -> u256;
    fn add_candidate(
        ref self: TContractState,
        age: felt252,
        address: ContractAddress,
        fullname: felt252,
        position: felt252,
        description: felt252
    );
    fn remove_candidate(ref self: TContractState, candidate: ContractAddress);
    fn verify(ref self: TContractState, vote_id: felt252);
    fn start_vote(ref self: TContractState, end_time: u64);
    fn end_vote(ref self: TContractState);
    fn vote(ref self: TContractState, candidate: ContractAddress);
    fn get_overseer(self: @TContractState) -> ContractAddress;
// fn display_winner(self: @TContractState) -> felt252;
// fn votes_per_candidate(self: @TContractState) -> u256;
// fn display_election(self: @TContractState) -> <T>;
}
