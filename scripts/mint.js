const { ethers, network } = require('hardhat');
const { encryptDataField } = require('@swisstronik/utils');
const fs = require('fs');
const path = require('path');

const sendShieldedTransaction = async (
  signer,
  destination,
  data,
  value
) => {
  const rpclink = (network.config).url

  const [encryptedData] = await encryptDataField(rpclink, data)

  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  })
}

async function main() {
  const contractAddress = '0x7d9cA90b9eFA5109658606F991B64dA51EbB9dd6'

  const [signer] = await ethers.getSigners()

  const contractFactory = await ethers.getContractFactory('PrivateNFT')
  const contract = contractFactory.attach(contractAddress)

  const mintFunctionName = 'mintNFT'
  const recipientAddress = signer.address
  const mintTx = await sendShieldedTransaction(
    //@ts-ignore
    signer,
    contractAddress,
    contract.interface.encodeFunctionData(mintFunctionName, [recipientAddress]),
    0
  )
  const mintReceipt = await mintTx.wait()
  console.log('Mint Transaction Hash: ', `https://explorer-evm.testnet.swisstronik.com/tx/${mintTx.hash}`)

  const mintEvent = mintReceipt?.logs
    .map((log) => {
      try {
        return contract.interface.parseLog(log)
      } catch (e) {
        return null
      }
    })
    .find((event) => event && event.name === 'NFTMinted')
  const tokenId = mintEvent?.args?.tokenId
  console.log('Minted NFT ID: ', tokenId.toString())

  const filePath = path.join(__dirname, '../utils/tx-hash.txt')
  fs.writeFileSync(filePath, `NFT ID ${tokenId} : https://explorer-evm.testnet.swisstronik.com/tx/${mintTx.hash}\n`, {
    flag: 'a',
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})