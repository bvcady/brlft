/* eslint-disable @typescript-eslint/no-use-before-define */
import { FormEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0.25rem;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.8);
  h3 {
    font-size: 1.6rem;
  }
  * {
    z-index: 1;
  }
`;

const Form = styled.form`
  width: 100%;
  height: fit-content;
  font-family: "Courier New", Courier, monospace;

  label {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    width: fit-content;
    font-size: 1rem;
  }

  fieldset {
    border-color: ${theme.colors.secondary.default};
    border-radius: 0.25rem;
    background-color: rgba(255, 255, 255, 0.8);
  }

  legend {
    font-weight: 500;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    background-color: ${theme.colors.secondary.default};
  }

  input {
    color: ${theme.colors.secondary.default};
    outline: none;
    font-size: 1rem;
    font-family: "Courier New", Courier, monospace;
    padding: 0.25rem 0.5rem;
  }

  input[type="text"] {
    border: 1px solid ${theme.colors.secondary.default};
    border-radius: 0.25rem;
    :focus,
    :active {
      border: 1px solid ${theme.colors.main.default};
    }
  }
`;

const defaultPerson = {
  name: "",
};

interface IForm {
  type: "avond" | "dag";
}

type Shape = {
  x: number;
  y: number;
  borders: number[];
  rotation: number;
};

export const RSVPForm = ({ type }: IForm) => {
  const [people, setPeople] = useState([defaultPerson]);
  const [user, setUser] = useLocalStorage("brlft-user", "");

  const [bgShapes, setBGShapes] = useState<Shape[]>([]);

  const wrapperRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (wrapperRef.current) {
      const dims = wrapperRef.current.getBoundingClientRect();

      const shapes = new Array(24).fill("").map(() => {
        return {
          x: Math.random() * (dims.width + 200) - 100,
          y: Math.random() * (dims.height + 200) - 100,
          borders: [
            20 + Math.random() * 80,
            20 + Math.random() * 80,
            20 + Math.random() * 80,
            20 + Math.random() * 80,
          ],
          rotation: Math.random() * 90,
        };
      });
      setBGShapes(shapes);
    }
  }, [wrapperRef]);

  return (
    <Wrapper ref={wrapperRef}>
      {bgShapes.map((s) => (
        <div
          style={{
            position: "absolute",
            top: s.y,
            left: s.x,
            borderRadius: `${s.borders[0]}% ${s.borders[1]}% ${s.borders[2]}% ${s.borders[3]}%`,
            transform: `rotate(${s.rotation}deg)`,
            width: 100,
            height: 100,
            opacity: 0.5,
            filter: "blur(10px)",
            backgroundColor: theme.colors.accent.default,
          }}
        />
      ))}

      <h3>
        Ben j<i>i</i>j er b<i>i</i>j?
      </h3>
      <p>
        Vul alsjeblieft voor elke persoon in jouw gezin / groep in of kunt komen en ook zeker of je
        niet kan komen!
      </p>
      {user ? <p>Hallo {user.name}</p> : null}
      {!user ? (
        <Form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            setUser({ name: "Bob", email: "bob@bob.nl" });
          }}
        >
          <fieldset name="dietaryWishes">
            <legend>Wie ben je?</legend>
            <label htmlFor="name">
              Je naam:
              <input type="text" autoComplete="off" data-lpignore="true" />
            </label>
            <label htmlFor="email">
              Je email:
              <input type="text" autoComplete="off" data-lpignore="true" />
            </label>

            <button type="submit">Begin!</button>
          </fieldset>
        </Form>
      ) : null}
      {/* <label htmlFor="nPeople">
        Hoeveel gasten?
        {people.length}
      </label> */}
      {user ? people.map((p) => <PersonFormSection key={p.name} type={type} />) : null}
    </Wrapper>
  );
};

const PersonFormSection = ({ type }: IForm) => {
  const [person, setPerson] = useState({ name: "" });

  return (
    <Form>
      <fieldset name="dietaryWishes">
        <legend>{person.name}</legend>
        {type === "dag" ? (
          <fieldset name="dietaryWishes">
            <legend>Diëet wensen</legend>
            <label htmlFor="email">
              <input type="text" />
            </label>
          </fieldset>
        ) : null}
      </fieldset>
    </Form>
  );
};
