import Authereum from 'authereum'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import Fortmatic from 'fortmatic'
import Portis from '@portis/web3'
import WalletConnectProvider from '@walletconnect/web3-provider'

import metamask from '../assets/svg/metamask.svg'

const providerOptions = {
	injected: {
		display: {
			logo: metamask,
			name: 'Injected',
			description: 'Connect with the provider in your Browser',
		},
		package: null,
	},
	authereum: {
		package: Authereum,
	},
	coinbasewallet: {
		package: CoinbaseWalletSDK, // Required
		options: {
			appName: 'My Awesome App', // Required
			infuraId: 'INFURA_ID', // Required
			rpc: '', // Optional if `infuraId` is provided; otherwise it's required
			chainId: 1, // Optional. It defaults to 1 if not provided
			darkMode: false, // Optional. Use dark theme, defaults to false
		},
	},
	fortmatic: {
		package: Fortmatic, // required
		options: {
			key: 'FORTMATIC_KEY', // required
			network: {
				rpcUrl: 'https://rpc-mainnet.maticvigil.com',
				chainId: 137,
			}, // if we don't pass it, it will default to localhost:8454
		},
	},
	portis: {
		package: Portis, // required
		options: {
			id: 'PORTIS_ID', // required
		},
	},
	walletconnect: {
		package: WalletConnectProvider, // required
		options: {
			infuraId: 'INFURA_ID', // required
		},
	},
}

export default providerOptions
