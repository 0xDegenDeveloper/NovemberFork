import styled from "styled-components";
import { NavLink, Link, useMatch, useResolvedPath } from "react-router-dom";

export const NavBar = styled.div`
  margin: 0 auto;
  justify-self: center;
  position: fixed;
  width: 100vw;
  top: 5vh;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto;
  align-items: center;
  padding: 0;
  /* z-index: 10; */
  z-index: ${(props) => (props.fullScreen ? "0" : "10")};
`;

/// nav bottom is animation text

export const NavTop = styled.div`
  width: 90%;
  display: grid;
  margin: 0 auto;
  align-items: center;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: auto;
  border-radius: 2rem;
  background-color: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  -moz-backdrop-filter: blur(2px);
  -o-backdrop-filter: blur(2px);
  -ms-backdrop-filter: blur(2px);
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.2);
  /* padding: clamp(10px, 1vw, 0.5rem); */
  padding: 0.25rem;
`;

export const NavTopMobile = styled.div`
  border-radius: 2.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  background-color: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  -moz-backdrop-filter: blur(4px);
  -o-backdrop-filter: blur(4px);
  -ms-backdrop-filter: blur(4px);
  box-shadow: 0px 0px 25px 0px rgba(255, 255, 255, 0.7);
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.2);
  left: 50%;
  transform: translateX(-50%);
  width: 90;
`;

export const Logo = styled.div`
  margin-top: auto 0;
  grid-column: 1;
  grid-row: 1;
  padding-left: clamp(10px, 3vw, 50px);
  font-size: clamp(21px, 2vw, 33px);

  a {
    color: var(--main-dark-color);
    font-weight: bold;
    font-family: "museo-sans", sans-serif;
    padding: 0;
  }

  a:hover {
    /* color: var(--main-lightest-color); */
  }
`;

export const NavLinks = styled.ul`
  text-align: center;
  grid-column: 2;
  grid-row: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  list-style: none;
  font-family: "Baloo Bhaijaan 2", cursive;
  text-align: center;

  white-space: nowrap;
  margin: 0 clamp(0px, 0.25vw, 7px);
  font-size: clamp(17px, 2vw, 22px);
  font-weight: 100;
  padding-top: 3px;

  a {
    color: var(--main-dark-color);
    padding: 0 clamp(0.5px, 1vw, 3px);
  }

  a.active {
    color: var(--main-light-color);
  }
  a.inactive {
    color: var(--main-dark-color);
  }

  a:hover {
    color: var(--main-lightest-color);
    /* font-size: clamp(24px, 2vw, 29px); */
    padding: 0 1rem;
    /* padding: 0;
    margin: 0; */
    /* white-space: nowrap;
    overflow: hidden; */
  }
`;

function CustomNavItem({ to, text, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <Link
      to={{ pathname: to }}
      className={isActive ? "active" : "inactive"}
      onClick={props.onClick}
    >
      {text}
    </Link>
  );
}

export const NavItem = styled(CustomNavItem)`
  white-space: nowrap;
  margin: 0 clamp(0px, 0.25vw, 7px);
  font-size: clamp(17px, 2vw, 22px);
  padding-top: 3px;
`;

export const NetworkDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
`;

export const NavBottom = styled.div`
  grid-column: 1;
  grid-row: 2;
  color: var(--main-light-color);
  font-size: clamp(13px, 1.5vw, 16px);
  font-family: "Baloo Bhaijaan 2", cursive;
  white-space: nowrap;
  overflow: hidden;
  margin: 1vh 0;
`;

export const NavMovingText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  animation: move 16s ease-in-out infinite;
  animation-delay: 4s;
  text-align: center;
  display: flexbox;
  justify-content: center;
  align-items: center;

  p {
    cursor: pointer;
    max-width: fit-content;
    color: var(--main-light-color);
    font-size: clamp(13px, 1.5vw, 16px);
    font-family: "Baloo Bhaijaan 2", cursive;
  }

  p:hover {
    color: var(--main-lightest-color);
  }

  /* @keyframes move {
    0% {
      opacity: 1;
    }
    10% {
      transform: translateX(20%);
      opacity: 1;
    }
    20% {
      transform: translateX(-120%);
      opacity: 0;
    }
    22% {
      opacity: 0;
      transform: translateX(120%);
    }

    42% {
      transform: translateX(-3%);
      opacity: 1;
    }
    50% {
      transform: translateX(0%);
      opacity: 1;
    }
  } */

  @keyframes move {
    0% {
      opacity: 1;
    }
    5% {
      transform: translateX(2%);
      opacity: 1;
    }
    8% {
      transform: translateX(-120%);
      opacity: 0;
    }
    9% {
      opacity: 0;
      transform: translateX(120%);
    }

    22% {
      transform: translateX(-1%);
      opacity: 1;
    }
    25% {
      transform: translateX(0%);
      opacity: 1;
    }

    50% {
      transform: translateX(0%);
      opacity: 1;
    }

    55% {
      transform: translateX(-1%);
      opacity: 1;
    }
    60% {
      transform: translateX(120%);
      opacity: 0;
    }
    61% {
      opacity: 0;
      transform: translateX(-120%);
    }

    71% {
      transform: translateX(3%);
      opacity: 1;
    }
    75% {
      transform: translateX(0%);
      opacity: 1;
    }
  }
`;
