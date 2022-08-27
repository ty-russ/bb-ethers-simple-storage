const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  //compile
  // connect to ganache blockchain HTTP://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  //connect to wallet address using private key
  const wallet = new ethers.Wallet(
    "3139971d51d3b37064cdc0a4eaed66e1999d692d892651c81be16ac52a4a7140",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("____Deploying contract, please wait___");
  const contract = await contractFactory.deploy();
  console.log(contract);
}

main()
  .then((result) => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
