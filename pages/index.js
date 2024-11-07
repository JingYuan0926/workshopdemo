// pages/index.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import ConnectWallet from '../components/ConnectWallet';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/constants';

const Home = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [count, setCount] = useState(null);

  // Function to read the current count from the contract
  const readCount = async () => {
    if (!provider) return alert("Please connect your wallet first.");
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const currentCount = await contract.getCount();
      setCount(currentCount.toString());
    } catch (error) {
      console.error("Error reading count:", error);
    }
  };

  // Function to increment the count in the contract
  const incrementCount = async () => {
    if (!signer) return alert("Please connect your wallet first.");
    try {
      console.log("Starting increment transaction...");
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const tx = await contract.increment();
      console.log("Increment transaction sent:", tx.hash);
      
      const receipt = await tx.wait();
      console.log("Increment transaction confirmed:", receipt);
      console.log("Gas used for increment:", receipt.gasUsed.toString());
      
      await readCount(); // Update the count after incrementing
      alert("Increment operation completed successfully");
    } catch (error) {
      console.error("Error incrementing count:", error);
    }
  };

  // Function to decrement the count in the contract
  const decrementCount = async () => {
    if (!signer) return alert("Please connect your wallet first.");
    try {
      console.log("Starting decrement transaction...");
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const tx = await contract.decrement();
      console.log("Decrement transaction sent:", tx.hash);
      
      const receipt = await tx.wait();
      console.log("Decrement transaction confirmed:", receipt);
      console.log("Gas used for decrement:", receipt.gasUsed.toString());
      
      await readCount(); // Update the count after decrementing
      alert("Decrement operation completed successfully");
    } catch (error) {
      console.error("Error decrementing count:", error);
    }
  };

  return (
    <div>
      <h2>Simple Counter DApp</h2>
      <ConnectWallet setProvider={setProvider} setSigner={setSigner} />
      
      <div style={{ marginTop: '20px' }}>
        <button onClick={readCount}>Read Count</button>
        {count !== null && <p>Current Count: {count}</p>}
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={incrementCount}>Increment Count</button>
        <button onClick={decrementCount} style={{ marginLeft: '10px' }}>
          Decrement Count
        </button>
      </div>
    </div>
  );
};

export default Home;
