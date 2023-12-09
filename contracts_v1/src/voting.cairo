use starknet::ContractAddress;

#[starknet::interface]
trait IERC20<T> {
    fn balance_of(self: @T, account: ContractAddress) -> u256;

    /// @dev to transfer tokens
    fn transfer(ref self: T, receiver: ContractAddress, amount: u256);

    /// @dev Function to transfer on behalf of owner
    fn transfer_from(ref self: T, sender: ContractAddress, receiver: ContractAddress, amount: u256);
}


#[starknet::contract]
/// @title An on-chain voting system that only allows verified ctizens to vote, mitigating fraud and double voting.
/// @author Okoli Evans, Roqeeb Bello, Olorunfemi Babalola Samuel
/// @notice For open and trusted voting system that allows only verified accounts to access vote function. Vote results are returned in real time.
/// @dev Restricts access to 'Controller', 'Agents' and actual voters. Returns vote counts autonomously to the frontend via interval calls

mod Voting {
    ///     USE SOULBOUND TOKEN AS PASS
    use core::starknet::event::EventEmitter;
    use starknet::{
        get_caller_address, get_contract_address, Zeroable, get_block_timestamp, TryInto
    };
    use contracts_v1::voting_interface::IVotingTrait;
    use starknet::ContractAddress;
    use array::ArrayTrait;
    use super::{IERC20Dispatcher, IERC20DispatcherTrait};
    use alexandria_storage::list::{IndexView, ListTrait, List};

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        NewCandidate: NewCandidate,
        Verified: Verified,
        Voted: Voted,
    }

    #[derive(Drop, starknet::Event)]
    struct NewCandidate {
        #[key]
        address: ContractAddress,
        #[key]
        position: felt252,
    }

    #[derive(Drop, starknet::Event)]
    struct Verified {
        #[key]
        voter: ContractAddress,
        #[key]
        vote_id: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct Voted {
        #[key]
        voter: ContractAddress,
        #[key]
        candidate: ContractAddress,
    }

    #[storage]
    struct Storage {
        moderator: ContractAddress,
        overseer: ContractAddress,
        winner_address: ContractAddress,
        start_time: u64,
        end_time: u64,
        total_votes: u256,
        winning_vote: u32,
        num_of_registered_voters: u256,
        num_of_regd_candidates: u256,
        started: bool,
        election_id: u256,
        ///@dev mappings
        verified: LegacyMap::<ContractAddress, bool>,
        voted: LegacyMap::<ContractAddress, bool>,
        is_eligible: LegacyMap::<ContractAddress, bool>,
        votes_per_candidate: LegacyMap::<ContractAddress, u32>,
        candidates: LegacyMap::<ContractAddress, Candidate>,
        voters: LegacyMap::<ContractAddress, Voter>,
        ///@dev storage structs
        election: Election,
        winner: Candidate,
        candidate: Candidate,
        registered_candidates: List<ContractAddress>,
        ///@dev despatchers
        token: IERC20Dispatcher,
    }

    #[derive(Copy, Drop, Serde, starknet::Store)]
    struct Voter {
        address: ContractAddress,
        is_verified: bool,
        voted: bool,
    }

    #[derive(Copy, Drop, Serde, starknet::Store)]
    struct Candidate {
        age: felt252,
        votes: u256,
        address: ContractAddress,
        fullname: felt252,
        position: felt252,
        description: felt252,
        is_eligible: bool,
    }

    #[derive(Drop, Serde, starknet::Store)]
    struct Election {
        election_id: u256,
        start_time: u256,
        end_time: u256,
        contest: felt252,
        // uri: felt252,
        // baseuri: felt252,
        started: bool,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        overseer: ContractAddress,
        election_id: u256,
        contest: felt252,
        moderator: ContractAddress,
        start: u64,
        token: ContractAddress,
    ) {

        assert(!overseer.is_zero(), 'err: Zero address');

        let blocktime: u64 = get_block_timestamp();
        assert(start > blocktime, 'err: blocktime');

        self.moderator.write(moderator);
        self.overseer.write(overseer);

        self.election_id.write(election_id);
        self.start_time.write(start);
        self.token.write(IERC20Dispatcher { contract_address: token });
    }
//1701990472

    ////////////////////////////////////////////////////////////////
    ///////////////// CORE FUNCTIONS  //////////////////////////////
    ////////////////////////////////////////////////////////////////

    #[external(v0)]
    impl VoteTraitImpl of IVotingTrait<ContractState> {
        /// @param position is the position ot title that is being contested
        /// @param description is the brief description or introduction of the candidate
        fn add_candidate(
            ref self: ContractState,
            age: felt252,
            address: ContractAddress,
            fullname: felt252,
            position: felt252,
            description: felt252
        ) {
            assert(fullname != '', 'add_candidate: null fullname');
            assert(description != '', 'add_candidate: null decsription');
            assert(!address.is_zero(), 'add_candidate: zero address');
            assert(self.is_eligible.read(address) == false, 'add_candidate: double entry');

            let candidate = Candidate {
                age, votes: 0, address, fullname, position, description, is_eligible: true,
            };
            self.candidates.write(address, candidate);
            self.is_eligible.write(address, true);
            self.num_of_regd_candidates.write( self.num_of_regd_candidates.read() + 1 );
            let mut regd_cand = self.registered_candidates.read();
            regd_cand.append(address);

            self.emit(NewCandidate { address, position });
        }

        fn remove_candidate(ref self: ContractState, candidate: ContractAddress) {
            self.assert_only_overseer();
            assert(self.is_eligible.read(candidate) == true, 'remove_candidate: not in db');

            self
                .candidates
                .write(
                    candidate,
                    Candidate {
                        age: 0,
                        votes: 0,
                        address: Zeroable::zero(),
                        fullname: '',
                        position: '',
                        description: '',
                        is_eligible: false,
                    }
                );

            let mut i = 0;
            let mut target_candidate = self.candidate.read().address;
            let mut regd_cands = self.registered_candidates.read();

    // loop to return the index of candidate and pop out the candidate from list
            loop {
                if i > regd_cands.len() {
                    break;
                }
                if candidate == regd_cands[i] {
                    target_candidate = regd_cands[i];
                    regd_cands.set(0, target_candidate);
                    regd_cands.pop_front();
                }
                i += 1;

            };

            self.num_of_regd_candidates.write( self.num_of_regd_candidates.read() - 1 );
            self.emit(NewCandidate { address: candidate, position: 'removed from contest', });
        }

        fn verify(ref self: ContractState, vote_id: u256) {
            let (caller, address_this) = self.get_contract_details();
            let election_id_num = self.election_id.read();
            assert(self.verified.read(caller) == false, 'verify: double verification');
            assert(election_id_num == vote_id, 'verify: incorrect id');

            let voter = Voter { address: caller, is_verified: true, voted: false, };

            self.verified.write(caller, true);
            self.voters.write(caller, voter);
            self.num_of_registered_voters.write(self.num_of_registered_voters.read() + 1);

            //MINT SBT
            self.token.read().transfer(caller, 1);

            self.emit(Verified { voter: caller, vote_id, });
        }


        fn start_vote(ref self: ContractState, end_time: u64) {
            self.assert_only_overseer();
            assert(
                self.start_time.read() <= get_block_timestamp(), 'start_vote: not start time yet'
            );
            assert(end_time > self.start_time.read(), 'start_vote: invalid end time');
            assert(self.started.read() == false, 'start_vote: voting already on');

            let regd_cands = self.registered_candidates.read();
            assert(regd_cands.len() > 1, 'invalid no of candidates');

            self.started.write(true);
        }


        fn end_vote(ref self: ContractState) {
            self.assert_only_overseer();
            assert(self.started.read() == true, 'end_vote: voting not on');
            assert(self.end_time.read() < get_block_timestamp(), 'end_vote: not end time');

            self.started.write(false);
        }


        fn vote(ref self: ContractState, candidate: ContractAddress) {
            let caller = get_caller_address();
            let tokenise = self.token.read().balance_of(caller);

            assert(tokenise > 0, 'no token pass');
            assert(self.started.read() == true, 'vote: voting not in session');
            assert(self.verified.read(caller) == true, 'vote: unverified');
            assert(self.voted.read(caller) == false, 'vote: voted');
            assert(self.is_eligible.read(candidate) == true, 'vote: ineligible');

            self._vote(candidate);
        }


        fn get_total_votes(self: @ContractState) -> u256 {
            self.total_votes.read()
        }
        
        fn get_overseer(self: @ContractState) -> ContractAddress {
            self.overseer.read()
        }

        fn get_total_candidates(self: @ContractState) -> u256 {
            self.num_of_regd_candidates.read()
        }
    }


    #[external(v0)]
    fn display_winner(self: @ContractState) -> Candidate {
        let true_winner = self.winner_address.read();
        self.candidates.read(true_winner)
    }

    #[external(v0)]
    fn display_election(self: @ContractState) -> Election {
        self.election.read()
    }


    #[generate_trait]
    impl InternalFunctionsImpl of InternalFunctionsTrait {
        fn assert_only_overseer(ref self: ContractState) {
            let caller = get_caller_address();
            assert(caller == self.overseer.read(), 'overseer: unauthorized call');
        }

        fn _vote(ref self: ContractState, candidate: ContractAddress) {
            let caller = get_caller_address();
            let candidate_votes = self.votes_per_candidate.read(candidate);
            self.voted.write(caller, true);
            self.total_votes.write(self.total_votes.read() + 1);

            self.votes_per_candidate.write(candidate, candidate_votes + 1);

            self._set_winner();

            self.emit(Voted { voter: caller, candidate, });
        }

        fn _set_winner(ref self: ContractState) -> Candidate {
            let mut winning_vote = 0;
            let mut i: u32 = 0;
            let mut candidates_core = self.registered_candidates.read();
            let mut true_winner = self.candidates.read(candidates_core[i]);

            loop {
                if i >= candidates_core.len() {
                    break;
                }

                if self.votes_per_candidate.read(candidates_core[i]) > i {
                    winning_vote = self.votes_per_candidate.read(candidates_core[i]);
                    self.winning_vote.write(winning_vote);
                    self.winner_address.write(candidates_core[i]);
                    true_winner = self.candidates.read(candidates_core[i]);
                }

                i += 1;
            };
            true_winner
        }

        fn get_contract_details(self: @ContractState) -> (ContractAddress, ContractAddress) {
            let caller = get_caller_address();
            let address_this = get_contract_address();
            (caller, address_this)
        }
    }
}
