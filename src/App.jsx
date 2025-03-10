import React from 'react';
import { WalletKitProvider, ConnectButton } from '@mysten/wallet-kit';
import './index.css';
import CreateStudentNFT from './Components/CreateStudentNFT';
import UpdateVotingPower from './Components/UpdateVotingPower';
import GraduateStudent from './Components/GraduateStudent';
import RegisterCandidate from './Components/RegisterCandidate';
import CastVote from './Components/CastVote';
import ViewResults from './Components/ViewResults';

function App() {
  return (
    <WalletKitProvider>
      <div className="App">
        <h1>University Election</h1>
        <div className="wallet-connect-button">
          <ConnectButton /> {/* Wallet connection button */}
        </div>
        <div className="grid">
          <CreateStudentNFT />
          <UpdateVotingPower />
          <GraduateStudent />
          <RegisterCandidate />
          <CastVote />
        </div>
        <ViewResults />
      </div>
    </WalletKitProvider>
  );
}

export default App;