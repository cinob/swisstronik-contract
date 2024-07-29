const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpcLink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpcLink, data);
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0x8EEDDfeAcD015F7E4C1eEd59e2F66c8912C1FdEC";
  const [signer] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("TESTNFT");
  const contract = contractFactory.attach(contractAddress);
  const functionName = "transfer";
  const amount = 1 * 10 ** 18;
  const functionArgs = ["0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1", amount.toString()];
  const transaction = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData(functionName, functionArgs),
    0
  );
  await transaction.wait();
  console.log("Transaction Response: ", `Transfer token has been success! Transaction hash: https://explorer-evm.testnet.swisstronik.com/tx/${transaction.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});