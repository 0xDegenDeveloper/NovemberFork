import Statement from "../components/global/Statement";
import { Section } from "../components/global/GlobalStyles.style";

import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsUpToLine,
  faArrowUpRightFromSquare,
  faChevronDown,
  faChevronCircleDown,
  faChevronCircleUp,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

function RootPage(props) {
  const sub = props.isMobile ? "/algo" : "/algorithms";

  /// fort awesome circle down chevron to open foot

  return (
    <>
      <Statement
        title="/Supplier of Internet Things"
        text=": : : Create The Future, Don't Consume It : : :"
        to="#welcome"
      />
      <Section id="welcome">
        <RootStyles isFooterOpen={props.isFooterOpen}>
          {/* <RootOne>
            <h1>Blending Art and Software</h1>
          </RootOne> */}
          <div>
            <h2>Need Something Built ?</h2>
            {/* <p>Need something built ? </p> */}
            <h2>
              <p>
                <a
                  href="mailto:NovemberFork@proton.me?subject=I'm Ready For The Future"
                  target="_blank"
                >
                  {" "}
                  NovemberFork@proton.me
                </a>
              </p>
            </h2>
          </div>
          <div>
            <h2>Don't ?</h2>
            <h2>
              <p>
                {/* Don't ?{" "} */}
                <Link
                  to="algorithms"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  {sub}
                </Link>{" "}
              </p>
            </h2>
          </div>
          {/* <RootLast>
          

            <FontAwesomeIcon
              className="custom-arrow-icon aa"
              icon={faArrowsUpToLine}
              onClick={() => props.setIsFooterOpen(!props.isFooterOpen)}
              style={{
                transform: props.isFooterOpen ? "" : "rotateX(540deg) ",
                fontSize: "2rem",
              }}
            ></FontAwesomeIcon>
          </RootLast> */}
        </RootStyles>
      </Section>
    </>
  );
}

// page-section
const RootStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  text-align: center;
  gap: 4rem;

  a {
    color: var(--main-dark-color);
  }

  a:hover {
    color: var(--main-lightest-color);
  }

  svg {
    margin-left: 0.5rem;
  }

  svg:hover {
    color: var(--main-lightest-color);
    cursor: pointer;
  }

  .custom-arrow-icon {
    color: ${(props) => {
      return props.isFooterOpen
        ? "var(--main-light-color)"
        : "var(--main-dark-color)";
    }};
  }

  .custom-arrow-icon:hover {
    color: var(--main-lightest-color);
    cursor: pointer;

    transition: transform 0.3s ease;
  }

  /* .aa {

    animation: ${(props) => {
    return keyframes`
     
        
      `;
  }}
      5s infinite ease-in-out;
  } */

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const RootOne = styled.div`
  grid-column: 1/3;

  h1 {
    font-size: clamp(18px, 4vw, 45px);
    /* font-family: "Baloo Bhaijaan 2"; */
    font-family: "Lato";
    /* font-family: "Museo Moderno"; */
    /* font-family: "Cairo"; */
  }

  @media (max-width: 820px) {
    grid-column: 1;
  }
`;

const RootLast = styled.div`
  grid-column: 1/3;

  @media (max-width: 820px) {
    grid-column: 1;
  }
`;

export default RootPage;
