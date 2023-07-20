import React, { useState, useEffect } from "react";
// import abi from "../assets/abi.json";
import { ethers } from "ethers";
import {
  useAccount,
  useBalance,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import styled from "styled-components";

const MintWrapper = styled.div`
  .button {
    border-radius: 5px;
    padding: 0.2rem 1rem 0.15rem;
    background-color: var(--main-dark-color);
    /* box-shadow: 0px 0px 10px 0px rgba(255, 20, 147, 0.6);
     */
    box-shadow: 0px 0px 10px 0px rgba(23, 20, 60, 0.5);

    border-radius: 1rem;
    /* border-color: #d886c2; */
    font-size: clamp(1rem, 3vw, 20px);
    /* border-style: solid; */
    border-width: 2px;
    text-align: center;
    cursor: pointer;
    color: var(--main-light-color);
  }

  .button:hover {
    box-shadow: 0px 0px 10px 0px rgba(188, 186, 212, 1);
  }

  button:disabled {
    background-color: var(--main-lightest-color);
    color: var(--main-dark-color);
    /* border-color: var(--main-dark-color); */

    background-color: rgba(255, 255, 255, 0.01);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    -moz-backdrop-filter: blur(2px);
    -o-backdrop-filter: blur(2px);
    -ms-backdrop-filter: blur(2px);
    /* box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.2); */
  }

  .mm {
    position: relative;
    padding-top: 0.3rem;
  }

  /* .message {
    margin: 0.5rem;
    opacity: 1;
    transition: opacity 3s ease-out;
    animation: move 30s ease-in-out;
    animation: goAway 16s ease-in-out;
  }

  .message-hidden {
    opacity: 0;
    transition: opacity 3s ease-out;
  } */

  .message,
  .message-hidden {
    margin: 0.5rem;
    display: inline-block;
    vertical-align: middle;
    transition: opacity 3s, max-width 3s, max-height 3s;
    overflow: hidden;
  }

  .message {
    opacity: 1;
  }

  .message-hidden {
    opacity: 0;
    max-width: 0;
    max-height: 0;
    margin: 0;
  }

  @keyframes goAway {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export function MintButton(props) {
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

  const [displayMessage, setDisplayMessage] = useState(null);
  const handleDisplayMessage = (message) => {
    setDisplayMessage(message);
    setTimeout(() => {
      setDisplayMessage(null);
    }, 3000); // Adjust the duration (in milliseconds) as needed
  };

  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: abi,
    functionName: "mintTokens",
    args: [props.mintQ],
    overrides: {
      value: ethers.BigNumber.from(props.priceWei).mul(props.mintQ),
    },
  });

  const {
    data: txnData,
    isLoading: isTxnLoading,
    isSuccess: isTxnStarted,
    write: mintTokens,
  } = useContractWrite(config);

  const { isSuccess: isTxnSuccess } = useWaitForTransaction({
    hash: txnData?.hash,
  });

  useEffect(() => {
    if (isTxnStarted && !isTxnSuccess) {
      // handleDisplayMessage(`Transaction Pending...`);
      // props.handleWatch(true);
    } else if (isTxnSuccess) {
      // handleDisplayMessage("Transaction Success!");
      // alert("Transaction Success!");
      props.handleWatch(true);
      // props.onWatch(false);
      setTimeout(() => {
        props.handleWatch(false);
      }, 6200); // wait for 2 seconds before setting watch to false
    }
  }, [isTxnStarted, isTxnSuccess, txnData]);

  useEffect(() => {
    const url = import.meta.env.VITE_DOMAIN + "/abi.json";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAbi(data))
      .catch((error) => console.error("Error fetching ABI:", error));
  }, []);

  return (
    <MintWrapper className="two">
      <button
        disabled={
          !mintTokens || ((isTxnLoading || isTxnStarted) && !isTxnSuccess)
        }
        onClick={() => mintTokens?.()}
        className="button"
        // style={{
        //   fontFamily: "Museo Moderno",
        // }}
      >
        mint {props.mintQ}
        {isTxnLoading && <div className="mm">Check Wallet</div>}
      </button>

      {/* {isTxnStarted && !isTxnSuccess && (
        <div>Transaction Pending... {txnData.hash}</div>
      )}
      {isTxnSuccess && <div>Transaction Success!</div>} */}
      <div className={`${displayMessage ? "message" : "message-hidden"}`}>
        {displayMessage}
      </div>
    </MintWrapper>
  );
}

// export  {MintButton};
