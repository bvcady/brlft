import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import styled from "styled-components";
import { useLocalStorage } from "../../utils/hooks/useLocalStorage";

interface INavigation {
  children?: ReactNode;
}

const Wrapper = styled.nav`
  align-items: center;
  display: flex;
  gap: 2rem;
  min-height: 2rem;
  overflow: visible;
  padding: 0.5rem 1rem;
  position: fixed;
  top: 2rem;
  width: clamp(100px, 1200px, 90vw);
  /* max-width: 100%; */
  z-index: 100;

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
  font-size: 1.5rem;
  text-decoration: none;
  text-transform: none;
  color: ${({ theme }) => theme.colors.secondary.default};
`;

const MenuItems = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: auto;
`;

const Hamburger = styled.div`
  margin-left: auto;
  font-weight: 900;

  display: flex;
  flex-direction: column;

  cursor: pointer;
  height: 1.5rem;
  width: 1.5rem;
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
  const [mobileDevice, toggleMobileDevice] = useState(true);

  const [type, setType] = useLocalStorage("brlft-type", "");
  const [user, setUser] = useLocalStorage("brlft-user", "");

  useEffect(() => {
    if (isMobile) {
      toggleHamburger(true);
      toggleMobileDevice(true);
    }
  }, []);

  useEffect(() => {
    console.log("user changed", user);
  }, [user]);

  const router = useRouter();

  return (
    <Wrapper>
      <Logo type="button" onClick={() => router.push("/")}>
        Brlf<i>t</i>
      </Logo>
      {user ? <p>Hallo {user.name}</p> : null}
      {!hamburger ? (
        <MenuItems>
          <button
            type="button"
            onClick={() => {
              setType("");
              setUser("");
              router.push("/");
            }}
          >
            Log Out
          </button>
          <button
            type="button"
            onClick={() => {
              router.push("/aanmelden");
            }}
          >
            Aanmelden
          </button>
          {children}
        </MenuItems>
      ) : null}
      {hamburger && mobileDevice ? (
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
              stroke="black"
              strokeLinecap="round"
            />

            <line
              x1={3}
              x2={19}
              y1={12}
              y2={12}
              strokeWidth={2}
              stroke="black"
              strokeLinecap="round"
            />

            <line
              x1={3}
              x2={19}
              y1={18}
              y2={18}
              strokeWidth={2}
              stroke="black"
              strokeLinecap="round"
            />
          </svg>
        </Hamburger>
      ) : null}
      <BG />
    </Wrapper>
  );
};
