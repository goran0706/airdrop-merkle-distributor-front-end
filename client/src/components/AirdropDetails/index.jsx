import useMerkleDistributorContract from '../../hooks/useMerkleDistributorContract';
import styled from '@emotion/styled';
import useWeb3Context from '../../hooks/useWeb3Context';
import tree from '../../constants/merkleTree.json';
import { useEffect, useState } from 'react';

const { claims } = tree;

const AirdropWrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    gap: 2rem;
    min-width: 480px;
    max-width: 520px;
    margin: 6rem auto auto;
    padding: 2rem;
    color: #fff;
    background-color: #4e4e4e;
    border: none;
    border-radius: 2rem;
    box-shadow: 0px 4px 16px #00000050, 0 0 8px 2px #444444 inset;
`;

const Title = styled.h1`
    color: #fff;
    font-size: 2rem;
    font-family: Nunito, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif,
        'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-weight: 700;
    line-height: 1.235;
`;

const Paragraph = styled.p`
    color: #adadad;
    font-size: 1rem;
    font-family: Nunito, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif,
        'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-weight: 400;
    line-height: 1.5;
    text-align: left;
    width: 100%;
`;

const Table = styled.table`
    border: 1px solid rgb(255 255 255 / 5%);
    border-radius: 5px;
`;

const TableRow = styled.tr``;

const TableHeader = styled.th`
    color: #adadad;

    font-weight: bold;
    border: 1px solid rgb(255 255 255 / 5%);
    border-radius: 5px;
    padding: 1rem;
    text-align: left;
`;

const TableData = styled.td`
    border: 1px solid rgb(255 255 255 / 5%);
    border-radius: 5px;
    padding: 1rem;
    text-align: left;
`;

const ClaimButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #a700ed;
    font-size: 16px;
    font-weight: bold;
    text-transform: none;
    width: auto;
    min-height: 58px;
    margin: 0 8px;
    padding: 0.8rem 2rem;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 3rem;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.7);
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    transition: background-color 0.15s ease-out 0s, box-shadow 0.15s ease-out 0s;
    :hover {
        box-shadow: ${({ disabled }) => (disabled ? '0px 4px 16px rgba(0, 0, 0, 0.7)' : '0 0 2px #000')};
        transform: ${({ disabled }) => (disabled ? 'translateY(0)' : 'translateY(1px)')};
        cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
        transition: all 0.15s ease;
    }
`;

const AirdropDetails = () => {
    const contract = useMerkleDistributorContract();
    const { account } = useWeb3Context();
    const [index, setIndex] = useState(null);
    const [proof, setProof] = useState(null);
    const [amount, setAmount] = useState(null);
    const [isClaimed, setIsClaimed] = useState(false);

    async function claimToken() {
        const txHash = await contract.claim(index, account, amount, proof);
        await txHash.wait();
    }

    useEffect(() => {
        const updateState = async () => {
            const claimAccounts = Object.keys(claims).map((e) => e.toLowerCase());
            const claimAccountsArr = Object.keys(claims).map((e) => ({
                address: e.toLowerCase(),
                index: claims[e]['index'],
                amount: claims[e]['amount'],
                proof: claims[e]['proof'],
            }));

            if (claimAccounts.includes(account?.toLowerCase())) {
                const { index, proof, amount } = claimAccountsArr[claimAccounts.indexOf(account.toLowerCase())];
                setIndex(index);
                setProof(proof);
                setAmount(amount);
                setIsClaimed(await contract.isClaimed(index));
            } else {
                setIndex(null);
                setProof(null);
                setAmount(null);
                setIsClaimed(false);
            }
        };

        updateState();
    }, [account, contract]);

    return (
        <AirdropWrapper>
            <Title>Token Airdrop</Title>
            <Table>
                <thead>
                    <TableRow>
                        <TableHeader>Account</TableHeader>
                        <TableHeader>Amount</TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    <TableRow>
                        <TableData>{account}</TableData>
                        <TableData>{amount}</TableData>
                    </TableRow>
                </tbody>
            </Table>
            {isClaimed && amount && <Paragraph>Drop already claimed.</Paragraph>}
            {!isClaimed && amount && (
                <Paragraph>
                    This account has not yet claimed the tokens. Total of {amount} tokens are pending to be claimed.
                </Paragraph>
            )}
            {!isClaimed && !amount && <Paragraph>You are not eligible for airdrop.</Paragraph>}
            <ClaimButton disabled={isClaimed ? true : false} onClick={claimToken}>
                Claim Airdrop
            </ClaimButton>
        </AirdropWrapper>
    );
};

export default AirdropDetails;
