import styled from '@emotion/styled';
import useWeb3Context from '../../hooks/useWeb3Context';

const ConnectButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #a700ed;
    font-size: 16px;
    font-weight: bold;
    text-transform: none;
    width: auto;
    min-height: 2rem;
    margin: 0 8px;
    padding: 0.8rem 2rem;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 3rem;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.7);
    transition: background-color 0.15s ease-out 0s, box-shadow 0.15s ease-out 0s;
    :hover {
        box-shadow: 0 0 2px #000;
        transform: translateY(1px);
        transition: all 0.15s ease;
    }
`;

const ConnectWallet = () => {
    const { account, connect, disconnect } = useWeb3Context();

    return !account ? (
        <ConnectButton onClick={connect}>Connect</ConnectButton>
    ) : (
        <ConnectButton onClick={disconnect}>Disconnect</ConnectButton>
    );
};

export default ConnectWallet;
