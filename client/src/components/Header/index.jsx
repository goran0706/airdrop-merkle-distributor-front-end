import styled from '@emotion/styled';
import ConnectWallet from '../ConnectWallet';
import Logo from '../Logo';
import NetworkDetails from '../NetworkDetails';
import WalletDetails from '../WalletDetails';

const StyledHeader = styled.header`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    padding: 1rem;
`;

const MenuWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
`;

const Header = () => {
    return (
        <StyledHeader>
            <Logo />
            <MenuWrapper>
                <NetworkDetails />
                <WalletDetails />
                <ConnectWallet />
            </MenuWrapper>
        </StyledHeader>
    );
};

export default Header;
