import React, { useState } from 'react';
import { useWalletKit } from '@mysten/wallet-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions'; // Correct import path

const CastVote = () => {
  const { signAndExecuteTransactionBlock } = useWalletKit();
  const [nftId, setNftId] = useState('');
  const [candidateId, setCandidateId] = useState('');

  const handleCastVote = async () => {
    const tx = new TransactionBlock();
    tx.moveCall({
      target: `0xYOUR_PACKAGE_ID::university::election::cast_vote`,
      arguments: [
        tx.pure.id(nftId),
        tx.pure.u64(candidateId),
      ],
    });

    await signAndExecuteTransactionBlock({ transactionBlock: tx });
    alert('Vote cast successfully!');
  };

  return (
    <div className="card">
      <h2>Cast Vote</h2>
      <input
        type="text"
        placeholder="Enter NFT ID"
        value={nftId}
        onChange={(e) => setNftId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter Candidate ID"
        value={candidateId}
        onChange={(e) => setCandidateId(e.target.value)}
      />
      <button onClick={handleCastVote}>Cast Vote</button>
    </div>
  );
};

export default CastVote;