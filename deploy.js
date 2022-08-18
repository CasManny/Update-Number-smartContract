const ethers = require('ethers')
const fs = require('fs-extra')
require('dotenv').config();

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, providers);
    const encryptedJson = fs.readFileSync('./encryptedKey.json', 'utf-8')
    let wallet = new ethers.Wallet.fromEncryptedJsonSync(encryptedJson, process.env.PRIVATE_KEY_PASSWORD)
    wallet = await wallet.connect(provider)

    const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf8');
    const binary = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin', 'utf8');

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

    const contract = await contractFactory.deploy()
    console.log('Please wait. contract is deploying...')
    console.log(contract.address)
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
