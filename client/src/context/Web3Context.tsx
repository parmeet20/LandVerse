import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import ABI from "../assets/Land.json";
import { contractAddress } from "@/assets/ContractAddress";

export interface Building {
  name: string;
  owner: string;
  posX: number;
  posY: number;
  posZ: number;
  sizeX: number;
  sizeY: number;
  sizeZ: number;
  price: number;
}

interface Web3ContextProps {
  account: string | null;
  provider: ethers.BrowserProvider | null;
  contract: ethers.Contract | null;
  mintBuilding: (
    name: string,
    posX: number,
    posY: number,
    posZ: number,
    sizeX: number,
    sizeY: number,
    sizeZ: number
  ) => Promise<void>;
  transferBuilding: (
    from: string,
    to: string,
    buildingId: number
  ) => Promise<void>;
  getBuildings: () => Promise<Building[]>;
  getBuildingPrice: (buildingId: number) => Promise<number>;
  isConnected: boolean;
}

const Web3Context = createContext<Web3ContextProps | undefined>(undefined);
interface Props {
  children: React.ReactNode;
}

export const Web3Provider: React.FC<Props> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      try {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(web3Provider);
        const accounts = await web3Provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        const contractInstance = new ethers.Contract(
          contractAddress,
          ABI.abi,
          await web3Provider.getSigner()
        );
        setContract(contractInstance);
        setIsConnected(true);
        window.ethereum.on("accountsChanged", (accounts: string[]) => {
          setAccount(accounts[0]);
          window.location.reload();
        });
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        web3Provider.on("block", () => {
          window.location.reload();
        });
      } catch (err) {
        console.error("Error connecting to web3:", err);
      }
    };

    if (window.ethereum) {
      init();
    } else {
      alert("Please install MetaMask or another Ethereum wallet extension");
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", () => {});
        window.ethereum.removeListener("chainChanged", () => {});
      }
    };
  }, []);

  const mintBuilding = async (
    name: string,
    posX: number,
    posY: number,
    posZ: number,
    sizeX: number,
    sizeY: number,
    sizeZ: number
  ) => {
    if (contract && account) {
      try {
        const tx = await contract.mint(
          name,
          posX,
          posY,
          posZ,
          sizeX,
          sizeY,
          sizeZ,
          { value: ethers.parseEther("1.0") }
        );
        await tx.wait();
        alert("Building minted successfully!");
        window.location.reload();
      } catch (err) {
        console.error("Minting error:", err);
        alert("Error minting building");
      }
    }
  };

  const transferBuilding = async (
    from: string,
    to: string,
    buildingId: number
  ) => {
    if (contract && account) {
      try {
        const tx = await contract.transferFrom(from, to, buildingId);
        await tx.wait();
        alert("Building transferred successfully!");
        window.location.reload();
      } catch (err) {
        console.error("Transfer error:", err);
        alert("Error transferring building");
      }
    }
  };

  const getBuildings = async () => {
    if (contract) {
      try {
        const buildings = await contract.getBuildings();
        return buildings;
      } catch (err) {
        console.error("Error fetching buildings:", err);
        return [];
      }
    }
    return [];
  };

  const getBuildingPrice = async (buildingId: number) => {
    if (contract) {
      try {
        const price = await contract.getBuildingPrice(buildingId);
        return price;
      } catch (err) {
        console.error("Error fetching building price:", err);
        return 0;
      }
    }
    return 0;
  };

  return (
    <Web3Context.Provider
      value={{
        account,
        provider,
        contract,
        mintBuilding,
        transferBuilding,
        getBuildings,
        getBuildingPrice,
        isConnected,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3Context must be used within a Web3Provider");
  }
  return context;
};
