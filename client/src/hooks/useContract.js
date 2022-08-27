import { ethers } from 'ethers'
import { useMemo } from 'react'
import useWeb3Context from './useWeb3Context'
import MERKLE_DISTRIBUTOR_ABI from '../abis/MerkleDistributor.json'
import { MERKLE_DISTRIBUTOR } from '../constants/contracts'

export default function useContract(address, abi, withSigner = false) {
	const { library, chainId, account } = useWeb3Context()

	return useMemo(() => {
		if (!address || !abi || !library || !chainId) return null

		const _withSigner = withSigner ? library?.getSigner(account).connectUnchecked() : library

		try {
			return new ethers.Contract(address, abi, _withSigner)
		} catch (error) {
			console.error('Failed to get contract', error)
			return null
		}
	}, [abi, account, address, chainId, library, withSigner])
}

export const useMerkleDistributorContract = () =>
	useContract(MERKLE_DISTRIBUTOR, MERKLE_DISTRIBUTOR_ABI, true)
