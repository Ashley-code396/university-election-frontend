import React, { useState } from 'react';
import { useWalletKit } from '@mysten/wallet-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions'; // Correct import path

const RegisterCandidate = () => {
  const { signAndExecuteTransactionBlock } = useWalletKit();
  const [nftId, setNftId] = useState('');
  const [name, setName] = useState('');
  const [campaignPromises, setCampaignPromises] = useState('');

  const handleRegisterCandidate = async () => {
    const tx = new TransactionBlock();
    tx.moveCall({
      target: `0xYOUR_PACKAGE_ID::university::election::register_candidate`,
      arguments: [
        tx.pure.id(nftId),
        tx.pure.string(name),
        tx.pure.string(campaignPromises),
      ],
    });

    await signAndExecuteTransactionBlock({ transactionBlock: tx });
    alert('Candidate registered successfully!');
  };

  return (
    <div className="card">
      <h2>Register Candidate</h2>
      <input
        type="text"
        placeholder="Enter NFT ID"
        value={nftId}
        onChange={(e) => setNftId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Candidate Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Campaign Promises"
        value={campaignPromises}
        onChange={(e) => setCampaignPromises(e.target.value)}
      />
      <button onClick={handleRegisterCandidate}>Register Candidate</button>
    </div>
  );
};

export default RegisterCandidate;