require("@nomicfoundation/hardhat-toolbox");

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
};
