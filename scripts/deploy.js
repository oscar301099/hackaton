const hre = require('hardhat');
const fs = require('fs');

async function main() {
  const network = hre.network.name;
  let taxFee = 0;

  if (network !== 'sepolia') {
    taxFee = 5; // Solo agregar tax si no es Sepolia
  }

  const Contract = await hre.ethers.getContractFactory('Genesis');
  const contract = await Contract.deploy(taxFee);

  await contract.deployed();

  const address = JSON.stringify({ address: contract.address }, null, 4);
  fs.writeFile('./src/abis/contractAddress.json', address, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Deployed contract address', contract.address);
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
