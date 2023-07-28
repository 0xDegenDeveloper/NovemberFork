import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

export default function Footer(props) {
  return (
    <>
      <FooterWrapper
        onMouseEnter={() => props.setIsFooterOpen(true)}
        onMouseLeave={() => props.setIsFooterOpen(false)}
        fullScreen={props.fullScreen}
      >
        <FooterTop>
          <Link
            // to={"/"}
            onClick={() => props.setIsFooterOpen(!props.isFooterOpen)}
          >
            Powered By Novemberfork
          </Link>
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{ paddingLeft: "0.5rem" }}
            onClick={() => props.setIsFooterOpen(!props.isFooterOpen)}
          ></FontAwesomeIcon>
        </FooterTop>
        {props.isFooterOpen && (
          <FooterBottom>
            <Link to="https://twitter.com/degendeveloper" target="_blank">
              <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
            </Link>
            <Link to="https://github.com/0xDegenDeveloper" target="_blank">
              <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
            </Link>
            <Link
              to="https://www.linkedin.com/in/degendeveloper/"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
              ></FontAwesomeIcon>
            </Link>
          </FooterBottom>
        )}
      </FooterWrapper>
    </>

    // <footer className="foot">

    // </footer>
  );
}

const FooterWrapper = styled.div`
  /* white-space: nowrap; */
  position: fixed;
  margin-top: auto;
  bottom: 0;
  z-index: ${(props) => (props.fullScreen ? "0" : "10")};

  padding: 0.5rem 0.8rem 0.5rem 1rem;
  /* margin-left: 1rem; */
  font-family: "Cairo";
  letter-spacing: 0.5px;
  background-color: var(--main-dark-color);

  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  -moz-backdrop-filter: blur(10px);
  -o-backdrop-filter: blur(10px);
  -ms-backdrop-filter: blur(10px);
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.3);
  font-size: clamp(8px, 3vw, 20px);

  a {
    color: var(--main-light-color);

    font-family: "Lato";

    /* padding: 1rem; */
  }

  a:hover {
    font-style: italic;
    color: var(--main-lightest-color);
  }
`;

const FooterTop = styled.div`
  color: var(--main-light-color);

  svg:hover {
    cursor: pointer;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem 0.5rem;

  a {
    padding: 0;
    font-size: clamp(13px, 4vw, 20px);
  }
`;
