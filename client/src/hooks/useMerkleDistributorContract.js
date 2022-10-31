import useContract from './useContract';
import { MERKLE_DISTRIBUTOR } from '../constants/contracts';
import MERKLE_DISTRIBUTOR_ABI from '../abis/MerkleDistributor.json';

export default function useMerkleDistributorContract() {
    return useContract(MERKLE_DISTRIBUTOR, MERKLE_DISTRIBUTOR_ABI, true);
}
