
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NFTGrid from './components/NFTGrid.js';
import NFTDetail from './components/NFTDetail.js';

import Navbar from './components/Navbar.js';
import UploadSuccess from './components/UploadSuccess.js';
import UploadImage from './components/UploadImage.js';



function App() {
  // 维护了组件内部的状态，数组里包含值和改变这个值的方法
  const [walletAddress, setWalletAddress] = useState('');

  // 每次页面加载都会调用
  useEffect(() => {
    // getWalletAddress(); //一进来自动连接上
    addWalletListener();
  },[]);

  // 监听钱包地址
  function addWalletListener(){
    if(window.ethereum){
      window.ethereum.on('accountsChanged', (accounts) => {
        if(accounts.length > 0){
          const account = accounts[0];
          setWalletAddress(account);
        } else {
          setWalletAddress('');
        }
      });
    }
  }

  // 获取钱包地址
  async function getWalletAddress() {
    if(window.ethereum){
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' });
      const account = accounts[0];
      setWalletAddress(account);
    } else {
      alert("Please install Metamask");
    }
  }

  return (
    <div id="container">
      <Router>
        <Navbar onConnectWallet={getWalletAddress} 
          walletAddress={walletAddress}/>

        <Routes>
          <Route path="/create-nft" exact element={<UploadImage address={walletAddress}/>} />
          <Route path="/success" element={<UploadSuccess />} />
          <Route path="/" element={<NFTGrid />} />
          <Route path="/nft-detail/:tokenId" element={<NFTDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
