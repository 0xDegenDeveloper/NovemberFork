import Statement from "../components/global/Statement";
import { Section } from "../components/global/GlobalStyles.style";
import { VisualizerSection } from "../components/visualizer/VisualizerSection";

import { useTokenDetails } from "../components/hooks/useTokenDetails";

import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const AlgorithmsPage = React.memo((props) => {
  //React.memo

  const [watch, setWatch] = useState(false);

  const tokenDetails = useTokenDetails(watch);

  const handleWatch = (value) => {
    setWatch(value);
  };

  return (
    <>
      <Statement
        title="/Algorithms"
        text=": : : Machine Art : : :"
        to="#welcome"
      />
      <Section id="welcome">
        <AlgoStyles>
          <div>
            <h2>Etheracts</h2>

            <p>A personal art & coding project</p>
          </div>

          <div>
            <h2>What is it ?</h2>

            <p>On chain self promotion & advertisement platform</p>
            {/* <p>Handles and messages will reset when sold</p> */}
          </div>
          <div>
            <h2>A Taste</h2>
            <p>The full visualizer is still under development</p>
            <p>sample and mint below</p>
          </div>
        </AlgoStyles>
      </Section>
      <Section>
        <VisualizerSection
          isMobile={props.isMobile}
          tokenDetails={tokenDetails}
          handleWatch={handleWatch}
        />
      </Section>
    </>
  );
});

const AlgoStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  text-align: center;
  justify-content: center;
  justify-items: center;
  max-width: 700px;

  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;

  a {
    color: var(--main-light-color);
  }

  > div:nth-child(1) {
    grid-row: 1;
    grid-column: 1;
  }

  > div:nth-child(2) {
    grid-row: 1;
    grid-column: 2;
  }

  > div:nth-child(3) {
    grid-row: 2;
    grid-column: 1/3;
  }

  // last element

  /* .selector {
    display: grid;

    h1 {
      font-family: "Cairo", sans-serif;
      margin: 0 auto;
      padding: 1rem;
    }

    h1:hover {
      cursor: pointer;
    }
  } */

  @media (max-width: 820px) {
    grid-template-columns: 1fr;

    > div:nth-child(1) {
      grid-column: 1;
      grid-row: 1;
    }

    > div:nth-child(2) {
      grid-column: 1;
      grid-row: 2;
    }

    > div:nth-child(3) {
      grid-column: 1;
      grid-row: 3;
    }
  }
`;

export default AlgorithmsPage;
