/* eslint-disable no-nested-ternary */
import styled from "styled-components";
import { Guest as GuestProps } from "../../../types";
import { MiniPerson } from "../mini/MiniPerson";

import CheckMark from "../../../../public/images/check.svg";

const Wrapper = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  display: grid;
  position: relative;
  grid-template-columns: repeat(3, 1fr);
  font-size: 1rem;
  gap: 0.5rem;
  margin: 0 auto;
  max-width: 600px;
  padding: 1.5rem 2rem;
  width: 100%;
  gap: 1rem;

  a {
    font-family: "Courier New", Courier, monospace;
    font-size: 0.8rem;
    opacity: 1;
  }
  .name-bar {
    grid-column: 1 / span 3;
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    gap: 1rem;
  }
  .guests {
    grid-column: 3 / span 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 0.5rem;
  }
`;

interface IGuest {
  guest: GuestProps;
}

export const Guest = ({ guest }: IGuest) => {
  const noneComing =
    !guest?.people && !guest?.people?.some((pers) => pers.type === "borrel" || pers.type === "dag");

  return (
    <Wrapper>
      {guest.validated ? (
        <div
          style={{
            position: "absolute",
            top: "-0.5rem",
            right: "0.5rem",
            borderRadius: "1rem",
            background: "#00D100",
            zIndex: 2,
            display: "flex",
            placeContent: "center",
            padding: "0.25rem",
          }}
        >
          <CheckMark fill="white" width="1rem" />
        </div>
      ) : null}
      <div className="name-bar">
        <h2>{guest.name} </h2>
        <a href={`mailto:${guest.email}`}>{guest.email}</a>
      </div>
      {!noneComing ? (
        <p>
          <b>{guest.type.toUpperCase()}</b>
        </p>
      ) : (
        <p />
      )}
      <div className="guests">
        {guest.people?.length ? (
          <p>
            {guest.people?.filter((p) => p.type !== "niet").length} gast
            {guest.people?.filter((p) => p.type !== "niet").length > 1 && "en"}
          </p>
        ) : !guest.people?.length ? (
          <p>Nog niet afgerond</p>
        ) : null}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {guest.people?.map((p) => (
            <MiniPerson name={p.name} notComing={p.type === "niet"} />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};
