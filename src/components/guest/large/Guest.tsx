import styled from "styled-components";
import { Guest as GuestProps } from "../../../types";
import { MiniPerson } from "../mini/MiniPerson";

const Wrapper = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  gap: 0.5rem;
  margin: 0 auto;
  max-width: 600px;
  padding: 1.5rem 2rem;
  width: 100%;

  a {
    font-family: "Courier New", Courier, monospace;
    font-size: 0.8rem;
    opacity: 1;
  }
  .name-bar {
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    padding: 0.5rem 0;
    *:not(:first-child) {
      margin-left: auto;
      padding: 0.25rem;
    }
  }
`;

interface IGuest {
  guest: GuestProps;
}

export const Guest = ({ guest }: IGuest) => {
  return (
    <Wrapper>
      <div className="name-bar">
        <h2>{guest.name} </h2>
        <a href={`mailto:${guest.email}`}>{guest.email}</a>
        <p>{guest.type.toUpperCase()} gast</p>
      </div>
      {guest.people?.length ? <p>{guest.people.length} gasten</p> : <p>Nog niet afgerond</p>}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {guest.people?.map((p) => (
          <MiniPerson name={p.name} />
        ))}
      </div>
    </Wrapper>
  );
};
