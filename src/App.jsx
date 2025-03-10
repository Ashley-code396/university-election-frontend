import React from 'react';
import { WalletKitProvider } from '@mysten/wallet-kit'; // Updated import
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import CreateStudentNFT from './components/CreateStudentNFT';
import CastVote from './components/CastVote';
import ViewResults from './components/ViewResults';

// Create a Sui client
const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });

function App() {
  return (
    <WalletKitProvider>
      <div className="App">
        <h1>University Election</h1>
        <CreateStudentNFT />
        <CastVote />
        <ViewResults />
      </div>
    </WalletKitProvider>
  );
}

export default App;