import styled from "styled-components";
import { useState } from "react";
import { Modal } from "./Modal";
import { Visualizer } from "./Visualizer";

import { MintSection } from "../web3/MintSection";

export function VisualizerSection(props) {
  const [modal, setModal] = useState(false);
  const [vidIndex, setVidIndex] = useState(0);

  const sampleAddrs = [
    // "0xa1a45e91164cdab8fa596809a9b24f8d4fdbe0f3", /
    // "0x756d64dc5edb56740fc617628dc832ddbcfd373c",
    // "0x73af3bcf944a6559933396c1577b257e2054d935",
    // "0x368d43c23843ca9b49dc861d80251bda6a090367",
    // "0xf443864ba5d5361bbc54298551067194f980a635",
    // "0xb4f4317b7885de16305d1303570879c21f378255",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
  ];

  const sampleMsgs = [
    "This is the visualizer, where you will be able to view minted artifacts and their messages",
    "Owners can store these messages on chain.",
    "Use this feature to promote your content or make a statement",
    "No, they will not be censored, this is web3",
    "The current handles are fake (for now), this is a demo",
    "Minting soon...",
  ];

  const sampleHandles = [
    "degendeveloper",
    "OnlyDust_com",
    "Starknet",
    "elonmusk",
    "punk6529",
    "degendeveloper",
  ];

  return (
    <>
      <VisualizerContainer>
        <Visualizer
          openModal={() => setModal(true)}
          vidIndex={vidIndex}
          setVidIndex={setVidIndex}
          isMobile={props.isMobile}
        />
        <MessagesAndMintingDiv>
          <div>
            <h1
              style={{
                marginBottom: "1.0rem",
              }}
            >
              # ?
            </h1>
            <p>
              Owner:{" "}
              <a
                href={`https://etherscan.io/address/${sampleAddrs[vidIndex]}`}
                target="_blank"
              >
                {`<${truncateAddress(sampleAddrs[vidIndex])}>`}
              </a>
            </p>
            <p>
              Handle:{" "}
              <a
                href={`https://twitter.com/${sampleHandles[vidIndex]}`}
                target="_blank"
              >
                {`@${sampleHandles[vidIndex]}`}
              </a>
            </p>
            <p
              style={{
                padding: "2.0rem 0",
                textAlign: "center",
                minHeight: "200px",
              }}
            >{`${sampleMsgs[vidIndex]}`}</p>
          </div>

          <MintSection
            tokenDetails={props.tokenDetails}
            handleWatch={props.handleWatch}
          />
        </MessagesAndMintingDiv>
      </VisualizerContainer>
      <Modal modal={modal} onClose={() => setModal(false)} />
    </>
  );
}

const truncateAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const MessagesAndMintingDiv = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  padding: 3rem;
  /* flex-direction: column; */
  /* grid-template-rows: 1fr; */
  /* justify-content: center;
  justify-items: center;
  align-content: center; */
  align-items: center;
  /* justify-items: center; */
  /* place-items: center; */
  /* place-content: center; */
  height: 100%;
  /// center vertically
  /* // justify-content: center; */
  /* margin: 1rem; */
  gap: 0.5rem;

  @media (max-width: 820px) {
    padding: 1rem;
  }

  h1 {
    font-size: clamp(27px, 2.5vw, 40px);
    font-family: "Lato";
  }

  p {
    font-size: clamp(15px, 2vw, 24px);
    font-family: "Lato";
  }

  a {
    color: var(--main-light-color);
  }
  a:hover {
    cursor: pointer;
  }
`;

const VisualizerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  /* justify-items: center; */

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr;
  }
`;
