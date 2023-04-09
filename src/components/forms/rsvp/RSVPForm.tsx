/* eslint-disable @typescript-eslint/no-use-before-define */
import { FormEvent, useState } from "react";
import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import { FormWrapper } from "../FormWrapper";
import { Form } from "../Styled.Form";

const defaultPerson = {
  name: "",
};

interface IForm {
  type: "borrel" | "dag";
}

export const RSVPForm = ({ type }: IForm) => {
  const [people, setPeople] = useState([defaultPerson]);
  const [user, setUser] = useLocalStorage("brlft-user", "");

  return (
    <FormWrapper>
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
    </FormWrapper>
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
