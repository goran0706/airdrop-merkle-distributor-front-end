import styled from '@emotion/styled'
import useWeb3Context from '../../hooks/useWeb3Context'

const Network = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;

	color: #fff;
	background-color: #4e4e4e;

	font-size: 16px;
	font-weight: bold;
	text-transform: capitalize;

	width: auto;
	min-height: 2rem;
	margin: 0 8px;
	padding: 0.8rem 2rem;

	outline: none;
	border: none;
	border-radius: 3rem;
`

const NetworkDetails = () => {
	const { network } = useWeb3Context()

	return network && <Network>{network?.name}</Network>
}

export default NetworkDetails
