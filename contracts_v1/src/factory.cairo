use starknet::ContractAddress;

#[starknet::interface]
trait IERC20<T> {
    /// @dev to transfer tokens
    fn transfer(ref self: T, receiver: ContractAddress, amount: u256);
}

#[starknet::contract]
mod factory {
    // @title An on-chain voting system that only allows verified ctizens to vote, mitigating fraud and double voting.
    /// @author Okoli Evans, Bello Roqeeb, Olorunfemi Babalola Samuel
    /// @notice For open and trusted voting system that allows only verified accounts to access vote function. Vote results are returned in real time.
    /// @dev Restricts access to 'Controller', 'Agents' and actual voters. Returns vote counts autonomously to the frontend via interval calls

    use core::starknet::event::EventEmitter;
    use contracts_v1::factory_interface::IVoteFactoryTrait;
    use starknet::{ContractAddress, get_caller_address, Zeroable, ClassHash, get_block_timestamp};
    use starknet::syscalls::deploy_syscall;
    use core::serde::Serde;
    use array::ArrayTrait;
    use super::{IERC20Dispatcher, IERC20DispatcherTrait};

    ///@dev events to emit at various ops
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        Create_election: Create_election,
    }

    #[derive(Drop, starknet::Event)]
    struct Create_election {
        #[key]
        voting_addr: ContractAddress,
        #[key]
        overseer: ContractAddress,
    }

    #[storage]
    struct Storage {
        voting_classhash: ClassHash,
        moderator: ContractAddress,
        token: IERC20Dispatcher,
        num_of_elections: u256,
        election_to_id: LegacyMap::<ContractAddress, u256>,
        contest_to_id: LegacyMap::<u256, Contest>,
        election_addresses: LegacyMap::<u256, ContractAddress>,
    }

    #[derive(Copy, Drop, Serde, starknet::Store)]
    struct Contest {
        vote_id: u256,
        is_id_registered: bool,
        overseer: ContractAddress,
        election: ContractAddress,
        contest: felt252,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState, token_address: ContractAddress, voting_classhash: ClassHash
    ) {
        let caller: ContractAddress = get_caller_address();
        assert(token_address.is_non_zero(), 'const: Zero address for token');

        self.moderator.write(caller);
        self.token.write(IERC20Dispatcher { contract_address: token_address });
        self.voting_classhash.write(voting_classhash);
    }


    #[external(v0)]
    impl VoteFactoryImpl of IVoteFactoryTrait<ContractState> {
        fn create_election(
            ref self: ContractState,
            vote_id: u256,
            contest: felt252,
            start: u64,
            token: ContractAddress,
            token_supply: u256
        ) -> ContractAddress {
            let contest_literal = self.contest_to_id.read(vote_id);

            assert(vote_id != contest_literal.vote_id, 'ID taken');
            assert(get_block_timestamp() < start, 'Invalid start time');

            let mut constructor_calldata = ArrayTrait::new();
            get_caller_address().serialize(ref constructor_calldata);
            vote_id.serialize(ref constructor_calldata);
            contest.serialize(ref constructor_calldata);
            self.moderator.read().serialize(ref constructor_calldata);
            start.serialize(ref constructor_calldata);
            token.serialize(ref constructor_calldata);

            let (voting_addr, _) = deploy_syscall(
                self.voting_classhash.read(), 0, constructor_calldata.span(), false
            )
                .expect('deploy_syscall failed');

            let contest_var = Contest {
                vote_id,
                is_id_registered: true,
                overseer: get_caller_address(),
                election: voting_addr,
                contest,
            };

            self.num_of_elections.write(self.num_of_elections.read() + 1);
            self.election_to_id.write(voting_addr, vote_id);
            self.contest_to_id.write(vote_id, contest_var);
            self.election_addresses.write(vote_id, voting_addr);
            self.token.read().transfer(voting_addr, token_supply);

            self.emit(Create_election { voting_addr, overseer: get_caller_address(), });

            return voting_addr;
        }

        fn return_election_id(self: @ContractState, voting_addr: ContractAddress) -> u256 {
            self.election_to_id.read(voting_addr)
        }

        fn return_elections(self: @ContractState ) -> Array<ContractAddress> {
            let mut election_address = ArrayTrait::new();
            let mut i: u256 = 0;

            loop {
                if self.num_of_elections.read() < i {
                    break;
                }
                election_address.append(self.election_addresses.read(i));
                i += 1;
            };
            election_address
        }

        fn change_moderator(ref self: ContractState, new_mod: ContractAddress) {
            assert(self.moderator.read() == get_caller_address(), 'Unauthorized caller');
            assert(!new_mod.is_zero(), 'Zero address err');
            self.moderator.write(new_mod);
        }

        fn update_classhash(ref self: ContractState, classhash: ClassHash) {
            let caller: ContractAddress = get_caller_address();
            assert(caller == self.moderator.read(), 'unauthorized caller');
            self.voting_classhash.write(classhash);
        }
    }
     #[external(v0)]
     fn return_contest(self: @ContractState, vote_id: u256) -> Contest {
       self.contest_to_id.read(vote_id)
     }
}
