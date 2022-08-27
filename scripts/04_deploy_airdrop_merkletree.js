// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require('hardhat')
require('dotenv').config({ path: require('find-config')('.env') })

async function main() {
	const tokenAddress = process.env.TOKEN_ADDRESS
	const merkleRoot = process.env.MERKLE_ROOT

	const AirdropMerkleTree = await hre.ethers.getContractFactory('AirdropMerkleTree')
	const airdropMerkleTree = await AirdropMerkleTree.deploy(tokenAddress, merkleRoot)
	await airdropMerkleTree.deployed()

	console.log(`AirdropMerkleTree contract deployed to ${airdropMerkleTree.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
	console.error(error)
	process.exitCode = 1
})
