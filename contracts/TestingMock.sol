// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @dev mumbai deploy 0x1cc15929e2c851C82E73fbF16737981623EE1326:
/// @dev https://mumbai.polygonscan.com/tx/0xe9f216e5b05bebe3216519dd828db16a99a3238b8ff6d98d53d7a4d87c361201
/// @dev mumbai second deploy: 0xAB3C241168013C2C594774CC5B8e49eE34278040
/// @dev https://mumbai.polygonscan.com/tx/0x9b725c442c3a3b2394e77aa18edd5f0337857132ea9487328cfa795a44773226
contract TestingMock {
    event AdminChanged(address indexed oldAdmin, address indexed newAdmin);

    function changeAdmin(address admin) external {
        emit AdminChanged(address(0), admin);
    }

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    function transferOwnership(address owner) external {
        emit OwnershipTransferred(address(0), owner);
    }

    event MinterUpdated(address minter, bool allowed);

    function setMinter(address minter, bool allowed) external {
        emit MinterUpdated(minter, allowed);
    }

    event SuperOperator(address superOperator, bool enabled);

    function setSuperOperator(address superOperator, bool enabled) external {
        emit SuperOperator(superOperator, enabled);
    }
}
