import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Metamask from "./walletComponent/Metamask.js";
import "../styles/wallet.css";

export default function Wallet() {
  const [walletAddress, setWalletAddress] = useState("");
  const [networkName, setNetworkName] = useState("");

  async function requestAccount() {
    console.log("Requesting account...");

    if (window.ethereum) {
      console.log("detected");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log("Wallet Address: ", walletAddress);

        const networkId = window.ethereum.networkVersion;
        const networkNames = {
          1: "Ethereum Mainnet",
          137: "Polygon",
        };
        const name = networkNames[networkId] || "Unregistered network";
        setNetworkName(name);
        console.log("Current network name: ", name);
      } catch (error) {
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

        // const provider = new ethers.BrowserProvider(window.ethereum);
        // const getBalance = async (walletAddress) => {
        //   try {
        //     const balance = await provider.getBalance(walletAddress);
        //     console.log("Balance:", ethers.utils.formatEther(balance));
        //   } catch (error) {
        //     console.log("Error:", error);
        //   }
        // };
        // getBalance(walletAddress);
      }
    }

    connectWallet();
  }, []);

  function shortenAddress(address) {
    const shortenedAddress = address.slice(0, 6) + "..." + address.slice(-4);
    return shortenedAddress;
  }

  const shortenedAddress = shortenAddress(walletAddress);

  return (
    <div className="wallet">
      <button className="wallet-button" onClick={requestAccount}>
        <Metamask />
        <div className="network-and-address">
          {walletAddress && <p>{networkName}</p>}
          <p>{walletAddress ? shortenedAddress : "Connect Wallet"}</p>
        </div>
      </button>
    </div>
  );
}
