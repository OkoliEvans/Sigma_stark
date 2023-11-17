
// @title An on-chain voting system that only allows verified ctizens to vote, mitigating fraud and double voting.
/// @author Okoli Evans, Bello Roqeeb, Olorunfemi Babalola Samuel
/// @notice For open and trusted voting system that allows only verified accounts to access vote function. Vote results are returned in real time.
/// @dev Restricts access to 'Controller', 'Agents' and actual voters. Returns vote counts autonomously to the frontend via interval calls
#[starknet::contract]

mod factory {
    use starknet:: {ContractAddress, get_caller_address };
    ///@dev events to emit at various ops
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        Create_election: Create_election,
    }

    #[derive(Drop, starknet::Event)]
    struct Create_election {
        voting_addr: ContractAddress,
        overseer: ContractAddress,
    }

    #[storage]
    struct Storage {
        moderator: ContractAddress,
        elections: Vec,
        election_to_id: LegacyMap::<ContractAddress, u32>,
        contest_to_id: LegacyMap::<u32, Contest>,
    }

    #[derive(Copy, Drop, Serde, starknet::Store)]
    struct Contest {
        vote_id: u256,
        is_id_registered: bool,
        overseer: ContractAddress,
        election: ContractAddress,
        contest_title: felt252,
    }

    
}