import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { ethers } from "ethers";
import {
  useAccount,
  useContractReads,
  useContractRead,
  useBalance,
} from "wagmi";
import { MintButton } from "./MintButton";

export function MintSection(props) {
  const { totalSupply, priceWei, isMinting, maxSupply } = props.tokenDetails;
  const { isConnected, address } = useAccount();
  const { data } = useBalance({
    address: isConnected
      ? address
      : "0xc17c646D6300bBff077115e10B1B7FDBe518929B",
  });
  const balance = !isConnected ? 0 : data?.value ? data.value : 0;
  const priceEth = ethers.utils.formatEther(priceWei ? priceWei : 0);

  const [quantity, setQuantity] = useState(1);
  const [canMint, setCanMint] = useState(false);
  const [reason, setReason] = useState("");

  const handleIncrement = () => {
    if (parseInt(totalSupply) + 1 <= parseInt(maxSupply)) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // const handleWatch = (value) => {
  //   setWatch(value);
  // };

  const canMintCheck = () => {
    // const balance = ethers.BigNumber.from(
    //   ethers.utils.formatUnits(
    //     ethers.BigNumber.from(data?.value ? data.value : 0),
    //     "wei"
    //   )
    // );
    // console.log("hi", data);
    // const balance = ethers.BigNumber.from(
    //   data?.value?.type === "BigNumber" ? data.value.hex : 0
    // );

    let reason = "";
    if (!isConnected) reason += "Connect Wallet.\n";
    else {
      if (!isMinting && quantity != "") reason += "Minting is not active.\n";
      if (
        ethers.BigNumber.from(balance).lt(
          ethers.BigNumber.from(priceWei).mul(quantity ? quantity : 1000000000)
        )
      )
        reason += "Insufficient Funds.\n";
      if (
        ethers.BigNumber.from(totalSupply).add(parseInt(quantity)) >
        parseInt(maxSupply)
      )
        reason += "Minting too many tokens.\n";
      if (quantity <= 0) reason += "Cannot mint 0 tokens.\n";
    }

    setReason(reason);

    setCanMint(reason === "" ? true : false);
  };

  useEffect(() => {
    canMintCheck();
  }, [isConnected, quantity, isMinting, totalSupply, maxSupply]);

  //   canMintCheck();

  return (
    <>
      <TokenDetailsWrapper>
        <p>{`Supply: ${totalSupply} / ${maxSupply}`}</p>
        <p>
          Price: {(parseFloat(priceEth) * parseFloat(quantity)).toFixed(4)}
          <em>Ξ</em>
        </p>
        <p>
          Balance: {parseFloat(ethers.utils.formatEther(balance)).toFixed(4)}
          <em>Ξ</em>
        </p>
      </TokenDetailsWrapper>
      <MintWrapper>
        <button
          className="button one"
          onClick={handleDecrement}
          disabled={quantity === 1 ? true : false}
        >
          <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
        </button>
        {canMint && (
          <MintButton
            mintQ={quantity}
            priceWei={ethers.BigNumber.from(priceWei)}
            handleWatch={props.handleWatch}
            toAdd="two"
          />
        )}
        {!canMint && (
          <button
            className="button two"
            disabled={true}
            // style={{
            //   fontFamily: "Museo Moderno",
            // }}
          >
            mint {":("}
          </button>
        )}

        <button
          className="button three"
          onClick={handleIncrement}
          disabled={
            parseInt(totalSupply) == parseInt(maxSupply) ||
            ethers.BigNumber.from(priceWei ? priceWei : 0)
              .mul(ethers.BigNumber.from(quantity ? quantity : 0))
              .gt(ethers.BigNumber.from(balance ? balance : 0))
              ? true
              : false
          }
        >
          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        </button>
      </MintWrapper>
    </>
  );
}

const TokenDetailsWrapper = styled.div`
  p {
    color: var(--main-light-color);
    font-family: "Baloo Bhaijaan 2";
  }

  em {
    font-family: Cairo, sans-serif;
  }
`;

const MintWrapper = styled.div`
  display: grid;
  /* flex-direction: column; */
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  /* justify-content: center; */
  justify-items: center;
  /* align-items: center; */
  /* width: 100%; */
  font-family: "Baloo Bhaijaan 2";
  .button {
    border-radius: 5px;
    padding: 0.2rem 1rem 0.15rem;
    background-color: var(--main-dark-color);
    box-shadow: 0px 0px 10px 0px rgba(23, 20, 60, 0.5);
    border-radius: 1rem;
    /* border-color: #d886c2; */
    font-size: clamp(1rem, 3vw, 20px);
    /* border-style: solid; */
    border-width: 2px;
    text-align: center;
    cursor: pointer;
    color: var(--main-light-color);
    white-space: nowrap;
  }

  .button:hover {
    box-shadow: 0px 0px 10px 0px rgba(188, 186, 212, 1);
  }

  .one {
    grid-column: 1;
    margin-left: auto;

    padding: 0.4rem 1rem 0.15rem;
  }

  .two {
    grid-column: 2;
  }

  .three {
    grid-column: 3;
    padding: 0.4rem 1rem 0.15rem;
    margin-right: auto;
  }

  button:disabled {
    background-color: var(--main-lightest-color);
    color: var(--main-dark-color);

    background-color: rgba(255, 255, 255, 0.01);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(2px);
    -moz-backdrop-filter: blur(2px);
    -o-backdrop-filter: blur(2px);
    -ms-backdrop-filter: blur(2px);
    /* box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.2); */
  }

  svg {
    padding-top: 0.1rem;
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;

    .one {
      grid-column: 1;
      grid-row: 2;
    }
    .two {
      grid-column: 1/3;
      grid-row: 1;
    }
    .three {
      grid-column: 2;
      grid-row: 2;
    }
  }
`;
