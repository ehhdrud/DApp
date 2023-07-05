import React, { useState } from "react";
import "../styles/wallet.css";

export default function Wallet() {
  const [walletAddress, setWalletAddress] = useState("");

  async function requestAccount() {
    console.log("Requesting account...");

    if (window.ethereum) {
      console.log("detected");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log(walletAddress);
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("METAMASK is uninstalled");
    }
  }

  return (
    <div className="wallet">
      <button className="wallet-button" onClick={requestAccount}>
        <i className="bx bx-lock-open-alt"></i>
        <p>Connect Wallet</p>
      </button>
      <p className="wallet-address">{walletAddress}</p>
    </div>
  );
}
