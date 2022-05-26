const { deployBeacon, deployBeaconProxy } = require('@openzeppelin/truffle-upgrades');

const FoundationV1 = artifacts.require('FoundationV1');
const FoundationFactory = artifacts.require('FoundationFactory');

module.exports = async function (deployer) {
  const beacon = await deployBeacon(FoundationV1); // FoundationV1 - impl contract
  console.log('Beacon deployed: ', beacon.address);

  await deployer.deploy(FoundationFactory, beacon.address);
  const factory = await FoundationFactory.deployed();

  console.log('Factory deployed: ', factory.address);
};