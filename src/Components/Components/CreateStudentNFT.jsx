import React, { useState } from 'react';
import { useWalletKit } from '@mysten/wallet-kit';
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
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create Student Voting NFT</h2>
      <input
        type="number"
        placeholder="Enter Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />
      <button
        onClick={handleCreateNFT}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Create NFT
      </button>
    </div>
  );
};

export default CreateStudentNFT;