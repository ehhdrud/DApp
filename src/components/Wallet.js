import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import MetamaskLogo from "./walletComponent/Metamask.js";
import "./styles/wallet.css";

export default function Wallet() {
  const [walletAddress, setWalletAddress] = useState("");
  const [networkName, setNetworkName] = useState("");

  async function requestAccount() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log("Wallet Address: ", walletAddress);

        const networkId = window.ethereum.networkVersion;
        const networkNames = {
          1: "Ethereum Mainnet",
          137: "Polygon Mainnet",
        };
        const name = networkNames[networkId] || "Unregistered network";
        setNetworkName(name);
        console.log("Current network name: ", name);
      } catch (error) {
        setWalletAddress("");
        setNetworkName("");
        console.log("Error connecting...");
      }
    } else {
      alert("METAMASK is uninstalled");
    }
  }

  useEffect(() => {
    async function connectWallet() {
      if (typeof window.ethereum !== "undefined") {
        await requestAccount();

        const provider = new ethers.BrowserProvider(window.ethereum);
        const getBalance = async (walletAddress) => {
          try {
            const balance = await provider.getBalance(walletAddress);
            console.log("Balance:", ethers.formatEther(balance));
          } catch (error) {
            console.log("Error:", error);
          }
        };
        getBalance(walletAddress);
      }
    }
    connectWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  window.ethereum.on("accountsChanged", requestAccount);
  window.ethereum.on("networkChanged", requestAccount);

  function shortenAddress(address) {
    const shortenedAddress = address.slice(0, 6) + "..." + address.slice(-4);
    return shortenedAddress;
  }

  const shortenedAddress = shortenAddress(walletAddress);

  return (
    <div className="wallet">
      <button className="wallet-button" onClick={requestAccount}>
        <div className="wallet-button-items">
          <MetamaskLogo />
          {walletAddress && <p>{networkName}</p>}
          <p>
            {walletAddress
              ? shortenedAddress
              : "Connect your wallet using MetaMask !"}
          </p>
        </div>
      </button>
    </div>
  );
}
