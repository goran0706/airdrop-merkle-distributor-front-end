import styled from '@emotion/styled'

const Wrapper = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;

	color: #fff;
	background-color: #4e4e4e;

	font-size: 16px;
	font-weight: bold;
	text-transform: none;
	text-decoration: none;

	width: auto;
	min-height: 2rem;
	margin: 0 8px;
	padding: 0.8rem 2rem;

	outline: none;
	border: none;
	border-radius: 3rem;
`

const Logo = () => {
	return <Wrapper href='/'>Airdrop</Wrapper>
}

export default Logo
