use starknet::{ContractAddress, ClassHash};
use array::ArrayTrait;
use alexandria_storage::list::{IndexView, ListTrait, List};


#[starknet::interface]
trait IVoteFactoryTrait<TContractState> {
    fn create_election(
        ref self: TContractState, vote_id: u256, contest: felt252, start: u64, token_supply: u256
    ) -> ContractAddress;

    fn return_election_id(self: @TContractState, voting_addr: ContractAddress) -> u256;
    fn change_moderator(ref self: TContractState, new_mod: ContractAddress);
    fn update_classhash(ref self: TContractState, classhash: ClassHash);
    fn return_elections(self: @TContractState) -> Array<ContractAddress>;
}
