import styled from '@emotion/styled'

const Text = styled.div`
	color: inherit;
	text-transform: uppercase;
`

const Currency = ({ currency }) => {
	return <Text>{currency}</Text>
}

export default Currency
