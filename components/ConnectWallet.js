import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const ConnectWallet = ({ setProvider, setSigner }) => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request permission to view accounts and trigger account selection modal
        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }]
        });
        
        // After permission, request accounts (this will show account selector)
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts'
        });
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setProvider(provider);
        setSigner(signer);
        setWalletAddress(accounts[0]);

        // Listen for account changes
        window.ethereum.on('accountsChanged', (accounts) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          } else {
            setWalletAddress(null);
          }
        });

      } catch (error) {
        console.error("Failed to connect wallet:", error);
        if (error.code === 4001) {
          alert("Please select a wallet to connect!");
        } else {
          alert("Error connecting wallet. Please try again.");
        }
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, []);

  return (
    <div>
      <button onClick={connectWallet}>
        {walletAddress ? `Connected: ${walletAddress}` : "Connect Wallet"}
      </button>
    </div>
  );
};

export default ConnectWallet;
