import React, { useState, useEffect } from "react";
import { useWalletKit } from "@mysten/wallet-kit";
import { useNavigate } from "react-router-dom";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import "../Styles/StudentDashboard.css";

const StudentDashboard = () => {
    const { currentAccount, disconnect } = useWalletKit();
    const navigate = useNavigate();
    const [selectedElection, setSelectedElection] = useState("");
    const [elections, setElections] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [voterNFT, setVoterNFT] = useState(null);
    const suiClient = new SuiClient({ url: getFullnodeUrl("testnet") });

    // Replace these with your actual Package ID and Object IDs
    const PACKAGE_ID = "0xdd0428e65ff4967f3b13e14666717a213680d4859b25c6ab77e1a29b75a01429";
    const ELECTION_OBJECT_ID = "0x<ELECTION_OBJECT_ID>";
    const CANDIDATE_OBJECT_ID = "0x<CANDIDATE_OBJECT_ID>";
    const VOTER_NFT_OBJECT_ID = "0x<VOTER_NFT_OBJECT_ID>";

    // Fetch elections and candidates on component mount
    useEffect(() => {
        if (currentAccount) {
            fetchElections();
            fetchCandidates();
            fetchVoterNFT();
        }
    }, [currentAccount]);

    // Fetch elections from the blockchain
    const fetchElections = async () => {
        try {
            const elections = await suiClient.getObject({
                id: ELECTION_OBJECT_ID,
                options: { showContent: true },
            });
            setElections(elections.data.content.fields.elections);
        } catch (error) {
            console.error("Error fetching elections:", error);
        }
    };

    // Fetch candidates from the blockchain
    const fetchCandidates = async () => {
        try {
            const candidates = await suiClient.getObject({
                id: CANDIDATE_OBJECT_ID,
                options: { showContent: true },
            });
            setCandidates(candidates.data.content.fields.candidates);
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    };

    // Fetch the student's Voter NFT
    const fetchVoterNFT = async () => {
        try {
            const voterNFT = await suiClient.getObject({
                id: VOTER_NFT_OBJECT_ID,
                options: { showContent: true },
            });
            setVoterNFT(voterNFT.data.content.fields);
        } catch (error) {
            console.error("Error fetching Voter NFT:", error);
        }
    };

    // Mint a Voter NFT
    const mintVoterNFT = async () => {
        const tx = new TransactionBlock();
        tx.moveCall({
            target: `${PACKAGE_ID}::election::create_student_voting_nft`,
            arguments: [tx.pure(currentAccount.address)],
        });

        try {
            await suiClient.signAndExecuteTransactionBlock({
                transactionBlock: tx,
                signer: currentAccount,
            });
            alert("Voter NFT minted successfully!");
            fetchVoterNFT(); // Refresh Voter NFT data
        } catch (error) {
            console.error("Error minting Voter NFT:", error);
        }
    };

    // Register as a candidate
    const registerCandidate = async (name, campaignPromises) => {
        const tx = new TransactionBlock();
        tx.moveCall({
            target: `${PACKAGE_ID}::election::register_candidate`,
            arguments: [tx.object(VOTER_NFT_OBJECT_ID), tx.pure(name), tx.pure(campaignPromises)],
        });

        try {
            await suiClient.signAndExecuteTransactionBlock({
                transactionBlock: tx,
                signer: currentAccount,
            });
            alert("Candidate registered successfully!");
            fetchCandidates(); // Refresh candidate list
        } catch (error) {
            console.error("Error registering candidate:", error);
        }
    };

    // Cast a vote
    const castVote = async (candidateId) => {
        const tx = new TransactionBlock();
        tx.moveCall({
            target: `${PACKAGE_ID}::election::cast_vote`,
            arguments: [tx.object(VOTER_NFT_OBJECT_ID), tx.object(candidateId)],
        });

        try {
            await suiClient.signAndExecuteTransactionBlock({
                transactionBlock: tx,
                signer: currentAccount,
            });
            alert("Vote cast successfully!");
            fetchCandidates(); // Refresh candidate list
        } catch (error) {
            console.error("Error casting vote:", error);
        }
    };

    // Handle election selection
    const handleElectionChange = (event) => {
        setSelectedElection(event.target.value);
    };

    // Get the selected election data
    const selectedElectionData = elections.find((election) => election.id === selectedElection);

    // Function to handle wallet disconnection
    const handleDisconnect = () => {
        disconnect();
        navigate("/");
    };

    return (
        <div className="student-dashboard">
            {/* Blue Navbar */}
            <nav className="navbar">
                <ul>
                    <li>
                        <a href="#elections">Elections</a>
                    </li>
                    <li>
                        <a href="#vote">Vote</a>
                    </li>
                    <li>
                        <a href="#results">Results</a>
                    </li>
                </ul>
            </nav>

            {/* Disconnect Button Container */}
            <div className="disconnect-button-container">
                <button onClick={handleDisconnect} className="disconnect-button">
                    Disconnect Wallet
                </button>
            </div>

            {/* Main Content */}
            <div className="content-container">
                {/* Mint Voter NFT Button */}
                {!voterNFT && (
                    <button onClick={mintVoterNFT} className="mint-button">
                        Mint Voter NFT
                    </button>
                )}

                {/* Election Dropdown */}
                <div className="election-dropdown">
                    <label htmlFor="election-select">Select Election: </label>
                    <select id="election-select" value={selectedElection} onChange={handleElectionChange}>
                        <option value="">-- Select an Election --</option>
                        {elections.map((election) => (
                            <option key={election.id} value={election.id}>
                                {election.name} (ID: {election.id})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Election Details Card */}
                {selectedElectionData && (
                    <div className="election-card">
                        <h2>{selectedElectionData.name}</h2>
                        <p>Election ID: {selectedElectionData.id}</p>
                        <p>Election Date: {selectedElectionData.date}</p>

                        {/* Black Line Separator */}
                        <hr className="black-line" />

                        {/* Candidates Section */}
                        <h3>Candidates</h3>
                        <div className="candidates-list">
                            {candidates.map((candidate, index) => (
                                <div key={index} className="candidate-item">
                                    <img src={candidate.avatar} alt={candidate.name} className="candidate-avatar" />
                                    <div className="candidate-details">
                                        <h4>{candidate.name}</h4>
                                        <p>Age: {candidate.age}</p>
                                        <p>Qualification: {candidate.qualification}</p>
                                        <button onClick={() => castVote(candidate.id)}>Vote</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Register as Candidate Form */}
                {voterNFT && voterNFT.voting_power >= 3 && (
                    <div className="register-candidate-form">
                        <h3>Register as Candidate</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const name = e.target.name.value;
                            const campaignPromises = e.target.campaignPromises.value;
                            registerCandidate(name, campaignPromises);
                        }}>
                            <input type="text" name="name" placeholder="Your Name" required />
                            <textarea name="campaignPromises" placeholder="Campaign Promises" required />
                            <button type="submit">Register</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;