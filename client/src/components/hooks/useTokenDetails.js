import { useMemo, useState, useEffect } from "react";
import { useContractRead, useChainId } from "wagmi";
import { ethers } from "ethers";

export const useTokenDetails = (watch) => {
  const onChain =
    parseInt(import.meta.env.VITE_TOKEN_CHAIN_ID) === useChainId();

  console.log("fetching token details");

  const [abi, setAbi] = useState([
    {
      inputs: [],
      name: "isMinting",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "MAX_SUPPLY",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "priceWei",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ]);

  useEffect(() => {
    const url = import.meta.env.VITE_DOMAIN + "/abi.json";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAbi(data))
      .catch((error) => console.error("Error fetching ABI:", error));
  }, [onChain]);

  const tokenContract = {
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi,
    chainId: import.meta.env.VITE_TOKEN_CHAIN_ID,
  };
  const totalSupply = onChain
    ? useContractRead({
        ...tokenContract,
        functionName: "totalSupply",
        watch: watch,
        chainId: import.meta.env.VITE_TOKEN_CHAIN_ID,
      }).data
    : ethers.BigNumber.from(0);
  const priceWei = onChain
    ? useContractRead({
        ...tokenContract,
        functionName: "priceWei",
        chainId: import.meta.env.VITE_TOKEN_CHAIN_ID,
      }).data
    : ethers.BigNumber.from(0);

  const isMinting = onChain
    ? useContractRead({
        ...tokenContract,
        functionName: "isMinting",
        chainId: import.meta.env.VITE_TOKEN_CHAIN_ID,
      }).data
    : false;

  const maxSupply = onChain
    ? useContractRead({
        ...tokenContract,
        functionName: "MAX_SUPPLY",
        chainId: import.meta.env.VITE_TOKEN_CHAIN_ID,
      }).data
    : ethers.BigNumber.from(1111);

  const memoizedTotalSupply = useMemo(() => totalSupply, [watch]);
  const memoizedPriceWei = useMemo(() => priceWei, []);
  const memoizedIsMinting = useMemo(() => isMinting, []);
  const memoizedMaxSupply = useMemo(() => maxSupply, []);

  return {
    totalSupply: memoizedTotalSupply,
    priceWei: memoizedPriceWei,
    isMinting: memoizedIsMinting,
    maxSupply: memoizedMaxSupply,
  };
};
