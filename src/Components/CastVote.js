import React, { useState } from 'react';
import { useWalletKit } from '@mysten/wallet-kit';
import { TransactionBlock } from '@mysten/sui/transactions';

const CastVote = () => {
  const { signAndExecuteTransactionBlock } = useWalletKit();
  const [candidateId, setCandidateId] = useState('');

  const handleCastVote = async () => {
    const tx = new TransactionBlock();
    tx.moveCall({
      target: `0xYOUR_PACKAGE_ID::university::election::cast_vote`,
      arguments: [tx.pure.u64(candidateId)],
    });

    await signAndExecuteTransactionBlock({ transactionBlock: tx });
    alert('Vote cast successfully!');
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Cast Vote</h2>
      <input
        type="number"
        placeholder="Enter Candidate ID"
        value={candidateId}
        onChange={(e) => setCandidateId(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />
      <button
        onClick={handleCastVote}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Cast Vote
      </button>
    </div>
  );
};

export default CastVote;