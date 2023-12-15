import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NFTCard from './NFTCard';
import { balanceOf,tokenOfOwnerByIndex } from '../utils/nft';
import '../App.css';

const NFTGrid = () => {
    const [nfts, setNfts] = useState([]);
    const navigate = useNavigate();

    const handleCardClick = (tokenId)=> {
        navigate( `/nft-detail/${tokenId}`);
    };
    useEffect( () => {
        const fetchNFTs = async () => {
            const length = await balanceOf("0x71C95911E9a5D330f4D621842EC243EE1343292e");
            console.log('length',length);
            for (let i = 0; i < length; i++) {
                const tokenId = await tokenOfOwnerByIndex
                ("0x71C95911E9a5D330f4D621842EC243EE1343292e",i);
                console.log('i',i)
                setNfts((prev)=>[...prev,tokenId]);
                setNfts((prev) => [...new Set(prev)])
            }
        };
            fetchNFTs();
    }, []);

    return (
        <div className="nft-grid">
            {nfts.map(nft=>(
                <NFTCard tokenId={nft} onClick={()=>handleCardClick(nft)}/>
            ))}
        </div>
    );
};

export default NFTGrid;