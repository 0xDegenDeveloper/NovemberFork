import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

import * as Nav from "./Navbar.style";

import { LoginButton } from "../../web3/LoginButton";

function Navbar(props) {
  const mobileText = [".", "/algo", "/phy", "/more", "NovFork"];
  const desktopText = [
    ". root",
    "/algorithms",
    "/physicals",
    "/more",
    "NovemberFork",
  ];
  const { address, isConnected } = useAccount();
  const options = props.isMobile ? mobileText : desktopText;

  return (
    <>
      <Nav.NavBar fullScreen={props.fullScreen}>
        <Nav.NavTop>
          <Nav.Logo>
            <Link to="./">{options[4]}</Link>
          </Nav.Logo>
          <Nav.NavLinks
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Nav.NavItem to="/" text={options[0]} id="/"></Nav.NavItem>
            <Nav.NavItem
              to="/algorithms"
              text={options[1]}
              id="/algorithms"
            ></Nav.NavItem>
            <Nav.NavItem to="/physicals" text={options[2]} id="/"></Nav.NavItem>
            <Nav.NavItem to="/more" text={options[3]} id="/more"></Nav.NavItem>
          </Nav.NavLinks>
          <Nav.NetworkDiv>
            <LoginButton isMobile={props.isMobile} />
          </Nav.NetworkDiv>
        </Nav.NavTop>
        <Nav.NavBottom>
          <Nav.NavMovingText>
            {isConnected && (
              <p>{`Welcome back <${truncateAddress(address)}>`}</p>
            )}
            {!isConnected && <p>{`Connect Wallet`}</p>}
          </Nav.NavMovingText>
        </Nav.NavBottom>
      </Nav.NavBar>
    </>
  );
}

export default Navbar;

const truncateAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
