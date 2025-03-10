import React, { useState } from 'react';
import { useWalletKit } from '@mysten/wallet-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions'; // Correct import path

const UpdateVotingPower = () => {
  const { signAndExecuteTransactionBlock } = useWalletKit();
  const [nftId, setNftId] = useState('');

  const handleUpdateVotingPower = async () => {
    const tx = new TransactionBlock();
    tx.moveCall({
      target: `0xYOUR_PACKAGE_ID::university::election::update_voting_power`,
      arguments: [tx.pure.id(nftId)],
    });

    await signAndExecuteTransactionBlock({ transactionBlock: tx });
    alert('Voting power updated successfully!');
  };

  return (
    <div className="card">
      <h2>Update Voting Power</h2>
      <input
        type="text"
        placeholder="Enter NFT ID"
        value={nftId}
        onChange={(e) => setNftId(e.target.value)}
      />
      <button onClick={handleUpdateVotingPower}>Update Voting Power</button>
    </div>
  );
};

export default UpdateVotingPower;