import { useMemo } from 'react'
import jazzicon from '@metamask/jazzicon'
import styled from '@emotion/styled/macro'

const IconWrapper = styled.div`
	display: flex;
	flex-wrap: nowrap;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	align-content: center;

	height: 24px;
	width: 24px;
`

const Identicon = ({ size, seed }) => {
	const icon = useMemo(
		() => seed && jazzicon(size, parseInt(seed.slice(2, 10), 16)),
		[size, seed],
	)

	return icon && <IconWrapper dangerouslySetInnerHTML={{ __html: icon?.outerHTML }} />
}

export default Identicon
