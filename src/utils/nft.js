import { ethers } from 'ethers';
import ABI from '../contracts/cUSDT.json';
import axios from 'axios';

let provider = new ethers.BrowserProvider(window.ethereum)
const contractAddress = "0x8464135c8F25Da09e49BC8782676a84730C318bC";
const contract = new ethers.Contract(contractAddress,ABI,await provider.getSigner());

export async function balanceOf(address) {
    const result = await contract.balanceOf(address);
    return Number(result);
}

export async function tokenOfOwnerByIndex(owner,index) {
    const result = await contract.tokenOfOwnerByIndex(owner,index);
    return Number(result);
}

export async function tokenURI(tokenId) {
    const result = await contract.tokenURI(tokenId);
    console.log(result);
}

export async function getMetadata(tokenId){
    const result = await contract.tokenURI(tokenId);
    const response = await axios.get(result);
    return{
        title:response.data.title,
        description:response.data.description,
        imageURL:response.data.image,
    }
}