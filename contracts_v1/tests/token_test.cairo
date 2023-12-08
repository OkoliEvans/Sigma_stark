use core::option::OptionTrait;
use snforge_std::{declare, ContractClassTrait, start_prank, stop_prank, start_warp, env::var};
use array::ArrayTrait;
use serde::Serde;
use traits::TryInto;
use starknet::{ContractAddress, get_caller_address, ClassHash, Zeroable, get_contract_address};
use starknet::Felt252TryIntoContractAddress;
use snforge_std::cheatcodes::contract_class::get_class_hash;
use contracts_v1::sigma::{IERC20Dispatcher, IERC20DispatcherTrait};



fn deploy_contract(namex: felt252, name: felt252, symbol: felt252, decimal: u256, init_supply: u256, recipient: ContractAddress) -> ContractAddress {

    let owner = 0x0719947d6faa0cb9a9794d6442947cc30e2aa198e92f3fb30f875354e167f4e7.try_into().unwrap();


    let contract = declare(namex);
    let mut calldata = ArrayTrait::new();
    name.serialize(ref calldata);
    symbol.serialize(ref calldata);
    decimal.serialize(ref calldata);
    owner.serialize(ref calldata);
    recipient.serialize(ref calldata);
    
    // Precalculate the address to obtain the contract address before the constructor call (deploy) itself
    let contract_address = contract.precalculate_address(@calldata);

    start_prank(contract_address, owner);
    let deployed_contract = contract.deploy(@calldata).unwrap();
    stop_prank(contract_address);

    deployed_contract
}

fn get_addresses() -> (ContractAddress, ContractAddress,) {
    let caller: ContractAddress = 0x0719947d6faa0cb9a9794d6442947cc30e2aa198e92f3fb30f875354e167f4e7
        .try_into()
        .unwrap();
    let address_this: ContractAddress = get_contract_address();
    return (caller, address_this);
}

#[test]
fn test_deploy_token() {
    let (caller, address_this) = get_addresses();
    let name = 'sigma';
    let symbol = 'smx';
    let dec = 18;
    let supply = 1000_000;
    
    let contract_address = deploy_contract('ERC20', name, symbol, 18, supply, caller);
    let Sigma_dispatcher = IERC20Dispatcher { contract_address };

    let total_supply = Sigma_dispatcher.total_supply();
    assert(total_supply == 1000_000, 'inaccurate total_supply');

}