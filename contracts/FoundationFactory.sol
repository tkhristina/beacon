// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FoundationFactory is Ownable {

    // ======== Immutable storage ========
    // upgradeable beacon
    UpgradeableBeacon immutable public upgradeableBeacon;

    address[] public foundations;

    // ======== Constructor ========
    constructor(address _logic) {
        upgradeableBeacon =  UpgradeableBeacon(_logic);
    }

    function upgrade(address newLogicImpl) onlyOwner public {
        upgradeableBeacon.upgradeTo(newLogicImpl);
    }

    // ======== Deploy contract ========
    function createFoundation(string calldata _name, address _owner)
        external
    {
        BeaconProxy proxy = new BeaconProxy(
           address(upgradeableBeacon),
        abi.encodeWithSignature("initialize(string,address)", _name, _owner)
        );
        foundations.push(address(proxy));
    }
}