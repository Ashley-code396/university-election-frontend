import React, { useState, useEffect } from "react";
import { useWalletKit } from "@mysten/wallet-kit";
import { useNavigate } from "react-router-dom";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { TransactionBlock } from "@mysten/sui.js/transactions";
//import "./AdminDashboard.css";

const AdminDashboard = () => {
    const { currentAccount, disconnect } = useWalletKit();
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [voters, setVoters] = useState([]);
    const [electionResults, setElectionResults] = useState([]);
    const suiClient = new SuiClient({ url: getFullnodeUrl("testnet") });

    // Replace these with your actual Object IDs
    const PACKAGE_ID = "0xdd0428e65ff4967f3b13e14666717a213680d4859b25c6ab77e1a29b75a01429";
    const CANDIDATE_OBJECT_ID = "0x<CANDIDATE_OBJECT_ID>";
    const VOTER_OBJECT_ID = "0x<VOTER_OBJECT_ID>";
    const ELECTION_RESULT_OBJECT_ID = "0x<ELECTION_RESULT_OBJECT_ID>";

    // Fetch candidates, voters, and election results on component mount
    useEffect(() => {
        if (currentAccount) {
            fetchCandidates();
            fetchVoters();
            fetchElectionResults();
        }
    }, [currentAccount]);

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

    // Fetch voters from the blockchain
    const fetchVoters = async () => {
        try {
            const voters = await suiClient.getObject({
                id: VOTER_OBJECT_ID,
                options: { showContent: true },
            });
            setVoters(voters.data.content.fields.voters);
        } catch (error) {
            console.error("Error fetching voters:", error);
        }
    };

    // Fetch election results from the blockchain
    const fetchElectionResults = async () => {
        try {
            const results = await suiClient.getObject({
                id: ELECTION_RESULT_OBJECT_ID,
                options: { showContent: true },
            });
            setElectionResults(results.data.content.fields.results);
        } catch (error) {
            console.error("Error fetching election results:", error);
        }
    };

    // Function to mark a student as graduated
    const graduateStudent = async (studentId) => {
        const tx = new TransactionBlock();
        tx.moveCall({
            target: `${PACKAGE_ID}::election::graduate_student`,
            arguments: [tx.object(VOTER_OBJECT_ID)],
        });

        try {
            await suiClient.signAndExecuteTransactionBlock({
                transactionBlock: tx,
                signer: currentAccount,
            });
            alert(`Student ${studentId} marked as graduated.`);
            fetchVoters(); // Refresh voter list
        } catch (error) {
            console.error("Error graduating student:", error);
        }
    };

    // Function to update voting power
    const updateVotingPower = async (studentId, newVotingPower) => {
        const tx = new TransactionBlock();
        tx.moveCall({
            target: `${PACKAGE_ID}::election::update_voting_power`,
            arguments: [tx.object(VOTER_OBJECT_ID), tx.pure(newVotingPower)],
        });

        try {
            await suiClient.signAndExecuteTransactionBlock({
                transactionBlock: tx,
                signer: currentAccount,
            });
            alert(`Voting power updated for student ${studentId}.`);
            fetchVoters(); // Refresh voter list
        } catch (error) {
            console.error("Error updating voting power:", error);
        }
    };

    // Function to disconnect wallet
    const handleDisconnect = () => {
        disconnect();
        navigate("/");
    };

    return (
        <div className="content-container">
            {/* Navbar */}
            <div className="navbar">
                <ul>
                    <li><a href="/admin-dashboard">Admin Dashboard</a></li>
                    <li><a href="/manage-candidates">Manage Candidates</a></li>
                    <li><a href="/manage-voters">Manage Voters</a></li>
                </ul>
            </div>

            {/* Disconnect Button */}
            <div className="disconnect-button-container">
                <button onClick={handleDisconnect} className="disconnect-button">
                    Disconnect Wallet
                </button>
            </div>

            {/* Main Content */}
            <div className="election-card">
                <h1>Admin Dashboard</h1>
                <p>Welcome, Admin! You can manage candidates and election results here.</p>

                {/* Candidates Section */}
                <section className="election-details">
                    <h2>Candidates</h2>
                    <ul className="candidates-list">
                        {candidates.map((candidate) => (
                            <li key={candidate.student_id} className="candidate-item">
                                <div className="candidate-details">
                                    <h4>{candidate.name}</h4>
                                    <p>Votes: {candidate.vote_count}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Voters Section */}
                <section className="election-details">
                    <h2>Voters</h2>
                    <ul className="candidates-list">
                        {voters.map((voter) => (
                            <li key={voter.student_id} className="candidate-item">
                                <div className="candidate-details">
                                    <h4>{voter.name}</h4>
                                    <p>Voting Power: {voter.voting_power}</p>
                                    <button onClick={() => graduateStudent(voter.student_id)}>
                                        Mark as Graduated
                                    </button>
                                    <button onClick={() => updateVotingPower(voter.student_id, voter.voting_power + 1)}>
                                        Increase Voting Power
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Election Results Section */}
                <section className="election-details">
                    <h2>Election Results</h2>
                    <ul className="candidates-list">
                        {electionResults.map((result) => (
                            <li key={result.candidate_id} className="candidate-item">
                                <div className="candidate-details">
                                    <h4>Candidate {result.candidate_id}</h4>
                                    <p>Total Votes: {result.total_votes}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;