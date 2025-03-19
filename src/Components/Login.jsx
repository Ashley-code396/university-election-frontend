import React, { useEffect } from "react";
import { useWalletKit, ConnectButton } from "@mysten/wallet-kit";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

const Login = () => {
    const { currentAccount, disconnect } = useWalletKit(); // Add disconnect function
    const navigate = useNavigate();

    // List of admin addresses
    const adminAddresses = [
        "0xAdminAddress1", // Address of the first admin account
        "0x606dd47ffc9a798e889efd392df8fe6a1e92cc61383249de79ffaafc4254700c", // Address of the second admin account
        // Add more admin addresses as needed
    ];

    // Check user role and redirect
    useEffect(() => {
        if (currentAccount) {
            console.log("Current Account:", currentAccount); // Debugging line
            console.log("Admin Addresses:", adminAddresses); // Debugging line

            if (adminAddresses.includes(currentAccount.address)) {
                console.log("Redirecting to Admin Dashboard"); // Debugging line
                navigate("/admin"); // Redirect to Admin Dashboard
            } else {
                console.log("Redirecting to Student Dashboard"); // Debugging line
                navigate("/student"); // Redirect to Student Dashboard
            }
        }
    }, [currentAccount, navigate]);

    return (
        <div className="login-container">
            <div className="background-overlay"></div> {/* Overlay for contrast */}
            <h1 className="welcome-message">Welcome To The Voting Hub</h1>
            {currentAccount ? (
                // Show "Disconnect Wallet" button if wallet is connected
                <button
                    className="login-button disconnect-button" // Add disconnect-button class
                    onClick={disconnect}
                >
                    Disconnect Wallet
                </button>
            ) : (
                // Show "Connect Wallet" button if wallet is not connected
                <ConnectButton className="login-button" />
            )}
        </div>
    );
};

export default Login;