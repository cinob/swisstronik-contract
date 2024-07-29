require('@nomicfoundation/hardhat-toolbox')
require('@nomicfoundation/hardhat-ethers')
require('@openzeppelin/hardhat-upgrades')

const privateKey = ''

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/", //URL of the RPC node for Swisstronik.
      accounts: [`0x${privateKey}`], //Your private key starting with "0x" 
    },
  },
  etherscan: {
    apiKey: `ANY_STRING_WILL_DO`,
    customChains: [
      {
        network: 'swisstronik',
        chainId: 1291,
        urls: {
          apiURL: 'https://explorer-evm.testnet.swisstronik.com/api',
          browserURL: 'https://explorer-evm.testnet.swisstronik.com',
        },
      },
    ],
  },
};
