import React, { useState } from 'react';
import { useWalletKit } from '@mysten/wallet-kit'; // Correct usage

const CreateStudentNFT = () => {
  const { signAndExecuteTransactionBlock } = useWalletKit(); // Hook is used correctly
  const [studentId, setStudentId] = useState('');

  const handleCreateNFT = async () => {
    const tx = new TransactionBlock();
    tx.moveCall({
      target: `0xcc5795a7a7e5a1f7947285ebb151c78d92da10197525103161980d4e32186cc8::university::election::create_student_voting_nft`,
      arguments: [tx.pure.u64(studentId)],
    });

    await signAndExecuteTransactionBlock({ transactionBlock: tx });
    alert('Student NFT created successfully!');
  };

  return (
    <div className="card">
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