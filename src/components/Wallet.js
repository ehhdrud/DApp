import React, { useState } from "react";
import { ethers } from "ethers";
import "../styles/wallet.css";

export default function Wallet() {
  const [walletAddress, setWalletAddress] = useState("");

  function shortenAddress(address) {
    const shortenedAddress = address.slice(0, 5) + "..." + address.slice(-4);
    return shortenedAddress;
  }

  const shortenedAddress = shortenAddress(walletAddress);

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

        const networkId = window.ethereum.networkVersion;
        console.log("Current network ID:", networkId);
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("METAMASK is uninstalled");
    }
  }

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);
    }
  }

  return (
    <div className="wallet">
      <button className="wallet-button" onClick={requestAccount}>
        {walletAddress ? (
          <i className="bx bxs-lock-open"></i>
        ) : (
          <i className="bx bxs-lock"></i>
        )}
        <p>{walletAddress ? shortenedAddress : "Connect Wallet"}</p>
      </button>
    </div>
  );
}
