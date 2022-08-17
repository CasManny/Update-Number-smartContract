const ethers = require('ethers')
const fs = require('fs-extra')
require('dotenv').config();

// Rpc http://127.0.0.1:7545

const connectionToTheBlockchain = "";


async function main() {
    const providers = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, providers);
    const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf8');
    const binary = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin', 'utf8');
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

    const contract = await contractFactory.deploy()

    const favoriteNumber = await contract.retrieveNumber();
    const setNumber = await contract.setNumber('87');
    console.log(favoriteNumber.toString());
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
