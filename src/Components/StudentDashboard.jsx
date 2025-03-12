import React, { useState } from "react";
import { useWalletKit } from "@mysten/wallet-kit";
import { useNavigate } from "react-router-dom";
import "../Styles/StudentDashboard.css";

const StudentDashboard = () => {
    const { disconnect } = useWalletKit();
    const navigate = useNavigate();
    const [selectedElection, setSelectedElection] = useState("");

    // Mock data for elections and candidates
    const elections = [
        {
            id: "1001",
            name: "MGM Board Election",
            date: "2023/06/07",
            candidates: [
                {
                    name: "Ram Haresh Nathan",
                    age: 21,
                    qualification: "Graduate in BCom",
                    avatar: "https://via.placeholder.com/50", // Placeholder avatar URL
                },
                {
                    name: "Rachana Mahesh Patil",
                    age: 22,
                    qualification: "Graduate",
                    avatar: "https://via.placeholder.com/50", // Placeholder avatar URL
                },
                {
                    name: "Prshant Manish More",
                    age: 23,
                    qualification: "Graduate",
                    avatar: "https://via.placeholder.com/50", // Placeholder avatar URL
                },
                {
                    name: "Shlok Roghuveer Rayjada",
                    age: 22,
                    qualification: "Graduate in BBA",
                    avatar: "https://via.placeholder.com/50", // Placeholder avatar URL
                },
            ],
        },
        {
            id: "1002",
            name: "Student Council Election",
            date: "2023/07/15",
            candidates: [
                {
                    name: "John Doe",
                    age: 20,
                    qualification: "Undergraduate",
                    avatar: "https://via.placeholder.com/50", // Placeholder avatar URL
                },
                {
                    name: "Jane Smith",
                    age: 21,
                    qualification: "Undergraduate",
                    avatar: "https://via.placeholder.com/50", // Placeholder avatar URL
                },
            ],
        },
    ];

    const handleElectionChange = (event) => {
        setSelectedElection(event.target.value);
    };

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
                            {selectedElectionData.candidates.map((candidate, index) => (
                                <div key={index} className="candidate-item">
                                    <img src={candidate.avatar} alt={candidate.name} className="candidate-avatar" />
                                    <div className="candidate-details">
                                        <h4>{candidate.name}</h4>
                                        <p>Age: {candidate.age}</p>
                                        <p>Qualification: {candidate.qualification}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;