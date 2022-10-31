import styled from '@emotion/styled';
import useShorten from '../../hooks/useShorten';

const Text = styled.div`
    color: inherit;
`;

const Address = ({ account }) => {
    return <Text>{useShorten(account)}</Text>;
};

export default Address;
