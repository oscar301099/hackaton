module.exports = {
  plugins: {
    solidity: "0.8.7",
    networks: {
      avalanche: {
        url: "https://api.avax.network/ext/bc/C/rpc",
        accounts: [`0x${process.env.PRIVATE_KEY}`]
      },
      etherscan: {
        apiKey: process.env.AVALANCHESCAN_API_KEY
      },
    tailwindcss: {},
    autoprefixer: {},
  },
}
