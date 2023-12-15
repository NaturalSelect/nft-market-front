import { ethers } from 'ethers';
import MyNFTABI from '../contracts/MyNFT.json';

async function main(){
    let provider = new ethers.BrowserProviders(window.ethereum);
    const contractAddress = '0x8464135c8F25Da09e49BC8782676a84730C318bC';
    let account = await provider.getSigner();

    const contract = new ethers.contract
    (contractAddress,MyNFTABI,account);
    const result = await contract.totalSupply();
    // 挖给自己一个NFT
    await contract.safeMint
    ('0x70997970C51812dc3A010C7d01b50e0d17dc79c8',
    'https://ipfs.io/ipfs/QmZ4tj')
    console.log(result.toString());
}