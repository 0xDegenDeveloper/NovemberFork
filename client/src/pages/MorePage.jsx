import Statement from "../components/global/Statement";
import { Section } from "../components/global/GlobalStyles.style";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function MorePage(props) {
  const isMobile = props.isMobile;

  return (
    <>
      <Statement title="/More" text=": : : The Team : : :" to="#welcome" />
      <Section id="welcome">
        <MoreStyles>
          <div>
            <h2>Founder & Developer</h2>

            <SnapshotStyle>
              <div className="w2">
                <a
                  href={`${import.meta.env.VITE_DOMAIN}/resume_may.pdf`}
                  className="snapshot"
                  target="_blank"
                >
                  <img
                    src={`${import.meta.env.VITE_DOMAIN}/snapshot.jpg`}
                    alt="Matt Carter"
                    className="id2"
                  />
                </a>
              </div>
            </SnapshotStyle>
            <p>Matt Carter </p>
          </div>
          <div>
            <SnapshotStyle isMobile={isMobile}>
              <div className="w2">
                <a
                  href={`${import.meta.env.VITE_DOMAIN}/degree.pdf`}
                  target="_blank"
                  className="snapshot"
                >
                  <img
                    className="id"
                    src={`${import.meta.env.VITE_DOMAIN}/id_pic.jpeg`}
                    alt="Matt Carter"
                  />
                </a>
              </div>
            </SnapshotStyle>
            <p
              style={{
                fontSize: "clamp(16px, 2vw, 22px)",
              }}
            >
              B.A in Computer Science
            </p>
          </div>
        </MoreStyles>
      </Section>
      <Section>
        <MoreStyles>
          <div className="rbits">
            <h2>Additional Work</h2>
            <h3>-RabbitHoles</h3>
            <p>
              RabbitHoles is a discussion platform built on Starknet, offering a
              space for permanent and censorship-resistant conversations
            </p>
            <p>
              Check out a demo and the contracts here{" "}
              <a href="https://rbits.space" target="_blank">
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>{" "}
              <a
                href="https://github.com/0xDegenDeveloper/RabbitHoles"
                target="_blank"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </p>
          </div>
        </MoreStyles>
      </Section>
    </>
  );
}

const SnapshotStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  align-items: center;

  .w {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    justify-items: center;
    a {
      padding: 0.3rem;
      margin: 1rem;
      max-width: 200px;
    }
    a:hover {
      animation: ballRoll 20s infinite ease-in-out;
    }
  }

  img {
    max-width: 150px;
    border-radius: 50%;
    width: clamp(75px, 40%, 200px);
    box-shadow: 0px 0px 10px 0px rgba(23, 20, 60, 0.5);

    // crop a little
  }

  .id {
    position: relative;
    padding: 0.5rem;
    border-radius: 1rem;
    min-width: 15px;
    min-height: 15px;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(10px);
    -moz-backdrop-filter: blur(10px);
    -o-backdrop-filter: blur(10px);
    -ms-backdrop-filter: blur(10px);
  }
  .id:hover {
    animation: ${(props) => {
        const isMobile = props.isMobile;
        const translateY = !isMobile
          ? { translateY1: "-350%", translateY2: "-250%" }
          : { translateY1: "-100%", translateY2: "-70%" };

        return keyframes`
        0%,
        5% {
          transform: translateX(0%) translateY(0%) rotateY(0deg) rotateX(0deg) rotateZ(0deg);
        }

        30%,
        33% {
          transform: translateX(-30%) translateY(${translateY.translateY1}) rotateY(180deg) rotateX(360deg) rotateZ(80deg);
        }

        60%,
        65% {
          transform: translateX(-15%) translateY(${translateY.translateY2}) rotateY(360deg) rotateX(180deg) rotateZ(180deg) rotateY(180deg);
        }

        100% {
          transform: translateX(0%) translateY(0%) rotateY(0deg) rotateX(0deg) rotateZ(0deg);
        }
      `;
      }}
      15s infinite ease-in-out;
  }

  .id2 {
    max-width: 200px;
    position: relative;
    border-radius: 50%;
    padding: 1rem;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(10px);
    -moz-backdrop-filter: blur(10px);
    -o-backdrop-filter: blur(10px);
    -ms-backdrop-filter: blur(10px);
    /* width: 50%; */
  }
  .id2:hover {
    animation: rotate360 4s infinite ease-in-out;
  }

  @keyframes rotate360 {
    /* to {
      transform: rotate(360deg);
    } */
    0% {
      transform: rotate(0deg);
    }
    50%,
    52% {
      transform: rotate(720deg);
    }
    /* 50%,
    55% {
      transform: rotate(-720deg);
    } */
    75%,
    100% {
      transform: rotate(0deg);
    }
  }

  .id::before,
  .id::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 0.5rem;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.1) 50%,
      transparent 50%,
      transparent 100%
    );
    transform-origin: 50% 50%;
    z-index: -1;
  }

  .id::after {
    background: linear-gradient(
      90deg,
      transparent 0%,
      transparent 50%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0.1) 100%
    );
  }
`;

const MoreStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  align-items: center;
  /* padding-left: auto; */
  /* padding-right: auto; */
  /* max-width: fit-content; */
  align-content: center;
  /* overflow: hidden; */

  .rbits {
    display: flex;
    flex-direction: column;
    text-align: left;
    place-items: center;
    place-content: center;
    margin: 0 auto;
    /* width: clamp(150px, 70vw, 700px); */
    max-width: 600px;
    a {
      color: var(--main-light-color);
      margin: 0 0.5rem;
    }

    h1,
    /* h2, */
    h3,
    a,
    p {
      text-align: left;
      width: 100%;
    }

    p {
      font-size: clamp(13px, 4vw, 20px);
    }
  }

  .resume h2:hover {
    cursor: pointer;
  }

  .two p {
    /* color: var(--main-lightest-color); */
  }
  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }

  h2 {
    font-size: clamp(20px, 3vw, 35px);
    /* color: var(--main-light-color); */
  }

  h1,
  p {
    padding: 1rem;
    /* color: var(--main-light-color); */
  }
  p {
    font-size: clamp(20px, 2vw, 26px);
  }
`;

export default MorePage;
