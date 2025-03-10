import React from 'react';
import { WalletKitProvider, ConnectButton } from '@mysten/wallet-kit'; // Import ConnectButton
import './index.css';
import CreateStudentNFT from './Components/CreateStudentNFT';
import CastVote from './Components/CastVote';
import ViewResults from './Components/ViewResults';

function App() {
  return (
    <WalletKitProvider>
      <div className="App">
        <h1>University Election</h1>
        <ConnectButton /> {/* Add a wallet connection button */}
        <CreateStudentNFT />
        <CastVote />
        <ViewResults />
      </div>
    </WalletKitProvider>
  );
}

export default App;