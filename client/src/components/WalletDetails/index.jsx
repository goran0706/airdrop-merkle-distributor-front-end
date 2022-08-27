import Address from './Address'
import Currency from './Currency'
import Identicon from './Identicon'
import styled from '@emotion/styled'
import useWeb3Context from '../../hooks/useWeb3Context'

const Wallet = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;

	color: #fff;
	background-color: #4e4e4e;

	font-size: 16px;
	font-weight: bold;
	text-transform: none;

	width: auto;
	min-height: 2rem;
	margin: 0 8px;
	padding: 0.8rem 2rem;

	outline: none;
	border: none;
	border-radius: 3rem;
`

const WalletDetails = () => {
	const { account } = useWeb3Context()

	return (
		account && (
			<Wallet>
				<Identicon
					size={24}
					seed={account}
				/>
				<Address account={account} />
				<Currency currency='eth' />
			</Wallet>
		)
	)
}

export default WalletDetails
