const HDWalletProvider = require('@truffle/hdwallet-provider');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
     skipDryRun: true,
     gas: 8000000,
    },

    coverage: {
      host: "localhost",
      network_id: "*",
      fork: "http://127.0.0.1:8545",
      disableConfirmationListener: true 
    },

    kovan: {
      provider: function () {
        return new HDWalletProvider([process.env.PRIVATE_KEY], `wss://kovan.infura.io/ws/v3/${process.env.PROJECT_ID}`)
      },
      network_id: 42,  
      gas: 8000000,
      gasPrice: 5000000000,
      skipDryRun: true,
      // networkCheckTimeout: 100000000,
      // timeoutBlocks: 200
    },
  },

  api_keys: {
    etherscan: process.env.ETHERSCAN_KEY,
  },

  plugins: ["truffle-plugin-verify"],
  
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.9",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 200
       },
      //  evmVersion: "london"
      }
    }
  },

};
