import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import styled from "styled-components";
import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { theme } from "../../styles/theme";

interface INavigation {
  children?: ReactNode;
}

const Wrapper = styled.nav`
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
  gap: 2rem;
  min-height: 2rem;
  overflow: visible;
  padding: 0.5rem 1rem;
  position: fixed;
  top: 2rem;
  width: clamp(100px, 1200px, 90vw);
  /* max-width: 100%; */
  z-index: 10;

  font-size: 0.8rem;

  p {
    padding: 0;
    margin: 0;
    font-size: 1rem;
  }
  button {
    cursor: pointer;
  }
`;

const Logo = styled.button`
  /* filter: url(#displacementFilter); */
  padding: 0.25rem 0;
  font-size: 1.5rem;
  text-decoration: none;
  text-transform: none;
  color: ${theme.colors.secondary.default};
`;

const MenuItems = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 0.5rem 0;
  gap: 1rem;
  margin-left: auto;
`;

const Hamburger = styled.div`
  margin-left: auto;

  display: flex;
  flex-direction: column;

  cursor: pointer;
  height: 1.5rem;
  width: 1.5rem;
`;

const Close = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  height: 1.5rem;
  width: 1.5rem;

  * {
    font-family: Kocha Clean;
    padding: 0;
    margin: 0;
    line-height: 0.5rem;
  }
`;

const BG = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(3px);
  filter: url(#displacementFilter);

  inset: 0 0 0 0;
  position: absolute;
  border-radius: 0.25rem;
  z-index: -1;
`;
export const Navigation = ({ children }: INavigation) => {
  const [hamburger, toggleHamburger] = useState(false);
  const [mobileDevice, toggleMobileDevice] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!getCookie("brlft-auth-token"));
  }, []);

  useEffect(() => {
    if (isMobile) {
      toggleHamburger(true);
      toggleMobileDevice(true);
    }
  }, []);

  const router = useRouter();
  const { asPath } = router;

  return (
    <Wrapper>
      <Logo
        type="button"
        onClick={async () => {
          if (!loggedIn) {
            return router.replace("/");
          }
          return router.push("/info");
        }}
      >
        Brlf<i>t</i>
      </Logo>
      {/* {user ? <p>Hallo {user.name}</p> : null} */}
      {!hamburger ? (
        <MenuItems>
          {loggedIn ? (
            <>
              <Link style={{ color: theme.colors.main.default }} href="/rsvp">
                Meld je aan!
              </Link>
              <Link href="/locatie">Locatie</Link>
              <Link href="/time-table">Tijds Indeling</Link>
              <Link href="/contact">Contact</Link>
              <button
                style={{
                  color: "#cc3300",
                  marginLeft: "auto",
                  paddingLeft: "2rem",
                  justifySelf: "flex-end",
                }}
                type="button"
                onClick={async () => {
                  deleteCookie("brlft-auth-token");
                  if (asPath === "/") return router.reload();
                  return router.replace("/");
                }}
              >
                Log Out
              </button>
            </>
          ) : null}
          {children}
        </MenuItems>
      ) : null}
      {!hamburger && mobileDevice && loggedIn ? (
        <Close
          onClick={() => {
            toggleHamburger(true);
          }}
        >
          <svg width="1.5rem" height="1.5rem">
            <line
              x1={3}
              x2={19}
              y1={6}
              y2={18}
              strokeWidth={2}
              stroke={theme.colors.secondary.default}
              strokeLinecap="round"
            />

            <line
              x1={3}
              x2={19}
              y1={18}
              y2={6}
              strokeWidth={2}
              stroke={theme.colors.secondary.default}
              strokeLinecap="round"
            />
          </svg>
        </Close>
      ) : null}
      {hamburger && mobileDevice && loggedIn ? (
        <Hamburger
          onClick={() => {
            toggleHamburger(false);
          }}
        >
          <svg width="1.5rem" height="1.5rem">
            <line
              x1={3}
              x2={19}
              y1={6}
              y2={6}
              strokeWidth={2}
              stroke={theme.colors.secondary.default}
              strokeLinecap="round"
            />

            <line
              x1={3}
              x2={19}
              y1={12}
              y2={12}
              strokeWidth={2}
              stroke={theme.colors.secondary.default}
              strokeLinecap="round"
            />

            <line
              x1={3}
              x2={19}
              y1={18}
              y2={18}
              strokeWidth={2}
              stroke={theme.colors.secondary.default}
              strokeLinecap="round"
            />
          </svg>
        </Hamburger>
      ) : null}
      <BG />
    </Wrapper>
  );
};
