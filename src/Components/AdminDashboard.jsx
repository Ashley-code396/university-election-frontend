import React, { useState, useEffect } from "react";
import { useWalletKit } from "@mysten/wallet-kit";
import { useNavigate } from "react-router-dom";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { TransactionBlock } from "@mysten/sui.js/transactions";

const AdminDashboard = () => {
    const { currentAccount, disconnect } = useWalletKit();
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [voters, setVoters] = useState([]);
    const [electionResults, setElectionResults] = useState([]);
    const suiClient = new SuiClient({ url: getFullnodeUrl("testnet") });

    // Fetch candidates, voters, and election results on component mount
    useEffect(() => {
        fetchCandidates();
        fetchVoters();
        fetchElectionResults();
    }, []);

    // Fetch candidates from the blockchain
    const fetchCandidates = async () => {
        try {
            const candidates = await suiClient.getObject({
                id: "<CANDIDATE_OBJECT_ID>", // Replace with the actual object ID
                options: { showContent: true },
            });
            setCandidates(candidates.data.content.fields);
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    };

    // Fetch voters from the blockchain
    const fetchVoters = async () => {
        try {
            const voters = await suiClient.getObject({
                id: "<VOTER_OBJECT_ID>", // Replace with the actual object ID
                options: { showContent: true },
            });
            setVoters(voters.data.content.fields);
        } catch (error) {
            console.error("Error fetching voters:", error);
        }
    };

    // Fetch election results from the blockchain
    const fetchElectionResults = async () => {
        try {
            const results = await suiClient.getObject({
                id: "<ELECTION_RESULT_OBJECT_ID>", // Replace with the actual object ID
                options: { showContent: true },
            });
            setElectionResults(results.data.content.fields);
        } catch (error) {
            console.error("Error fetching election results:", error);
        }
    };

    // Function to mark a student as graduated
    const graduateStudent = async (studentId) => {
        const tx = new TransactionBlock();
        tx.moveCall({
            target: "university::election::graduate_student",
            arguments: [tx.object("<VOTER_NFT_OBJECT_ID>")], // Replace with the actual object ID
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
            target: "university::election::update_voting_power",
            arguments: [tx.object("<VOTER_NFT_OBJECT_ID>"), tx.pure(newVotingPower)],
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
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin! You can manage candidates and election results here.</p>

            {/* Candidates Section */}
            <section>
                <h2>Candidates</h2>
                <ul>
                    {candidates.map((candidate) => (
                        <li key={candidate.student_id}>
                            <strong>{candidate.name}</strong> - Votes: {candidate.vote_count}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Voters Section */}
            <section>
                <h2>Voters</h2>
                <ul>
                    {voters.map((voter) => (
                        <li key={voter.student_id}>
                            <strong>{voter.name}</strong> - Voting Power: {voter.voting_power}
                            <button onClick={() => graduateStudent(voter.student_id)}>
                                Mark as Graduated
                            </button>
                            <button onClick={() => updateVotingPower(voter.student_id, voter.voting_power + 1)}>
                                Increase Voting Power
                            </button>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Election Results Section */}
            <section>
                <h2>Election Results</h2>
                <ul>
                    {electionResults.map((result) => (
                        <li key={result.candidate_id}>
                            <strong>Candidate {result.candidate_id}</strong> - Total Votes: {result.total_votes}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Disconnect Button */}
            <button onClick={handleDisconnect} className="disconnect-button">
                Disconnect Wallet
            </button>
        </div>
    );
};

export default AdminDashboard;