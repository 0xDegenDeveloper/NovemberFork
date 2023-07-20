import React from "react";
import styled from "styled-components";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function LoginButton(props) {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted !== "loading";
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <AccountButton onClick={openConnectModal} type="button">
                    Verify Keys
                  </AccountButton>
                );
              }

              {
                if (chain.unsupported) {
                  return (
                    <AccountButton onClick={openChainModal} type="button">
                      Wrong network
                    </AccountButton>
                  );
                }
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  {!props.isMobile && (
                    <ChainButton onClick={openChainModal} type="button">
                      {chain.name}/
                    </ChainButton>
                  )}

                  <AccountButton onClick={openAccountModal} type="button">
                    {account.displayName}
                  </AccountButton>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
    // label="Verify Keys"
    // chainStatus={"none"}
    // accountStatus={{ smallScreen: "avatar", largeScreen: "address" }}
    // showBalance={false}
  );
}

const ChainButton = styled.div`
  display: flex;
  align-items: center;
  color: var(--main-light-color);
  font-family: Cairo, sans-serif;
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }
`;

const AccountButton = styled.div`
  display: flex;
  padding: clamp(2px, 5vw, 8px) clamp(3px, 5vw, 10px);
  border-radius: 2rem;
  border: none;
  white-space: nowrap;
  font-family: Lato, sans-serif;
  font-weight: 700;

  text-align: center;
  font-size: clamp(9px, 2vw, 11px);
  color: var(--main-light-color);
  background: var(--main-dark-color);
  margin-right: 1rem;
  box-shadow: 0px 0px 5px 0px var(--main-dark-color);

  &:hover {
    cursor: pointer;
  }
`;
