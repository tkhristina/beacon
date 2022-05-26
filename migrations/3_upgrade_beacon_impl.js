const { upgradeBeacon } = require('@openzeppelin/truffle-upgrades');

const FoundationV2 = artifacts.require('FoundationV2');
const FoundationFactory = artifacts.require('FoundationFactory');

module.exports = async function (deployer) {
  const factory = await FoundationFactory.deployed();
  console.log('Factory address: ', factory.address);

  const beaconAddress =await factory.upgradeableBeacon();
  await upgradeBeacon(beaconAddress, FoundationV2, { deployer });
  console.log("Beacon upgraded", beaconAddress);
};