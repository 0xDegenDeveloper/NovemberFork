import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintRoller } from "@fortawesome/free-solid-svg-icons";

function StudioControls(props) {
  const [controlsOpen, setControlsOpen] = useState(false);
  const location = useLocation();
  const inStudio = location.pathname === "/studio";

  useEffect(() => {
    if (!inStudio) {
      setControlsOpen(false);
    }
  }, [inStudio]);

  return (
    <StudioWrapper fullScreen={props.fullScreen}>
      <StudioIcon></StudioIcon>

      <StudioControlsStyle
        show={props.inStudio}
        onClick={() => {
          setControlsOpen(!controlsOpen);
        }}
      >
        <p>: : :</p>
      </StudioControlsStyle>

      {/* {controlsOpen && props.inStudio && (
        <StudioControlsPanel
          setIsContainedSystem={props.setIsContainedSystem}
          cycleFlow={props.cycleFlow}
          setControlsOpen={props.setControlsOpen}
        ></StudioControlsPanel>
      )} */}
    </StudioWrapper>
  );
}

const StudioIcon = () => {
  return (
    <>
      <IconWrapper>
        <Link
          to="/studio"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FontAwesomeIcon icon={faPaintRoller}></FontAwesomeIcon>
        </Link>
      </IconWrapper>
    </>
  );
};

const StudioControlsPanel = (props) => {
  return (
    <>
      <div
        onClick={() => {
          props.setIsContainedSystem();
        }}
      >
        Set isContainedSystem
      </div>
      <div
        onClick={() => {
          props.cycleFlow();
        }}
      >
        Cycle flow
      </div>
      <div>button 3</div>
    </>
  );
};

const IconWrapper = styled.div`
  padding: 2rem 0.5rem;
  white-space: nowrap;
  font-size: clamp(32px, 2.5vw, 45px);
  color: var(--main-dark-color);

  a {
    color: var(--main-dark-color);
  }

  svg {
    padding: 1rem;
  }

  svg:hover {
    cursor: pointer;
    color: var(--main-lightest-color);
  }
`;

const StudioControlsStyle = styled.div`
  writing-mode: vertical-lr;

  opacity: ${(props) => (props.show ? 1 : 0)};
  transform: translateY(${(props) => (props.show ? 0 : 50)}px);
  transition: opacity 0.5s, transform 0.5s;

  p {
    margin: 0;
    padding: 1rem;
    writing-mode: vertical-lr;
    font-size: clamp(32px, 2.5vw, 45px);
    font-family: "Baloo Bhaijaan 2, cursive";
    font-weight: 700;
  }

  p:hover {
    cursor: pointer;
    color: var(--main-lightest-color);
  }
`;

const StudioWrapper = styled.div`
  z-index: ${(props) => (props.fullScreen ? "0" : "10")};

  position: fixed;
  top: 15vh;
  left: 0;
  display: grid;
  justify-self: center;
  align-self: center;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  align-content: center;
  justify-items: center;
`;

export default StudioControls;
