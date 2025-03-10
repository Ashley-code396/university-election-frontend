import React, { useState } from 'react';
import { useWalletKit } from '@mysten/wallet-kit'; // Updated import
import { TransactionBlock } from '@mysten/sui/transactions';

const CreateStudentNFT = () => {
  const { signAndExecuteTransactionBlock } = useWalletKit();
  const [studentId, setStudentId] = useState('');

  const handleCreateNFT = async () => {
    const tx = new TransactionBlock();
    tx.moveCall({
      target: `0xYOUR_PACKAGE_ID::university::election::create_student_voting_nft`,
      arguments: [tx.pure.u64(studentId)],
    });

    await signAndExecuteTransactionBlock({ transactionBlock: tx });
    alert('Student NFT created successfully!');
  };

  return (
    <div>
      <h2>Create Student Voting NFT</h2>
      <input
        type="number"
        placeholder="Enter Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <button onClick={handleCreateNFT}>Create NFT</button>
    </div>
  );
};

export default CreateStudentNFT;