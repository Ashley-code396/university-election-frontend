import React, { useState } from 'react';
import { useWalletKit } from '@mysten/wallet-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions'; // Correct import path

const GraduateStudent = () => {
  const { signAndExecuteTransactionBlock } = useWalletKit();
  const [nftId, setNftId] = useState('');

  const handleGraduateStudent = async () => {
    const tx = new TransactionBlock();
    tx.moveCall({
      target: `0xYOUR_PACKAGE_ID::university::election::graduate_student`,
      arguments: [tx.pure.id(nftId)],
    });

    await signAndExecuteTransactionBlock({ transactionBlock: tx });
    alert('Student graduated successfully!');
  };

  return (
    <div className="card">
      <h2>Graduate Student</h2>
      <input
        type="text"
        placeholder="Enter NFT ID"
        value={nftId}
        onChange={(e) => setNftId(e.target.value)}
      />
      <button onClick={handleGraduateStudent}>Graduate Student</button>
    </div>
  );
};

export default GraduateStudent;