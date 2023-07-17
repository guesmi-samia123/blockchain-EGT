//https://eth-sepolia.g.alchemy.com/v2/n4FMd8AyEU_48nXVlhbsv4Cmj2zamMSj
//pluging to build smart contract tests
require("@nomicfoundation/hardhat-toolbox");
//require('@nomiclabs/hardhat-waffle');
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/n4FMd8AyEU_48nXVlhbsv4Cmj2zamMSj',
      accounts: ['aa2b6da7328f00e30a580c24c0329df3b8a555e203be5a337a0485a8c000da55'],
    },
  },
};
