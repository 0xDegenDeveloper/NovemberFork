import React, { useState } from "react";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleDown,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const StatementContent = styled.div`
  display: grid;
  grid-row: 2;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  color: var(--main-dark-color);
  align-content: center;
  align-items: center;

  h1 {
    grid-column: 1;
    grid-row: 1;
    font-size: clamp(30px, 5vw, 50px);
    font-family: museo-sans, sans-serif;
    text-align: center;
    color: var(--main-dark-color);
  }

  p {
    grid-row: 2;
    grid-column: 1;
    font-size: clamp(28px, 3vw, 35px);
    text-align: center;
    font-family: "Baloo Bhaijaan 2", cursive;
    color: var(--main-light-color);
  }
`;

const StatementWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  justify-content: center;
  justify-items: center;
  align-items: center;
`;

const SectionStyled = styled.section`
  min-height: 100vh;
  width: 100vw;
  padding: 20vh clamp(75px, 7.75vw, 150px) 7.5vh;
  scroll-snap-align: start;
  text-align: center;
  display: grid;
  overflow-y: scroll;
`;

const ChevDown = styled.div`
  grid-row: 3;
  margin-top: auto;
  font-size: clamp(35px, 4vw, 45px);
  a {
    text-decoration: none;
    color: var(--main-dark-color);
    font-style: bold;
  }
`;
function Statement(props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <SectionStyled>
      {/* <h1>{props.title}</h1>
      <p>{props.text}</p> */}
      <StatementWrapper>
        <StatementContent>
          <h1>{props.title}</h1>
          <p>{props.text}</p>
        </StatementContent>
        <ChevDown>
          <a
            href={props.to}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <FontAwesomeIcon
              icon={isHover ? faChevronCircleDown : faChevronDown}
            ></FontAwesomeIcon>
          </a>
        </ChevDown>
      </StatementWrapper>
    </SectionStyled>
  );
}

export default Statement;
