import { useState } from "react";
import { FormWrapper } from "./FormWrapper";
import { Form } from "./Styled.Form";
import { Person } from "../../pages/rsvp";

interface Props {
  index: number;
  initialPerson?: Partial<Person>;
  handleAddPerson: (person: Partial<Person>) => void;
}

export const PersonForm = ({ index, initialPerson, handleAddPerson }: Props) => {
  const [person, setPerson] = useState<Partial<Person>>(initialPerson);
  const [isOpen, toggleIsOpen] = useState(initialPerson.open);

  return (
    <div>
      {person ? (
        <FormWrapper>
          {isOpen ? (
            <Form>
              <fieldset name="name">
                <legend>
                  Gast {index + 1} ({person.name})
                </legend>
                <label htmlFor="name">
                  Naam:
                  <input
                    id="name"
                    type="text"
                    required
                    defaultValue={person.name}
                    onChange={(e) => setPerson({ ...person, name: e.target.value })}
                  />
                </label>
                {/* <fieldset>
                  Ik kom voor
                  <label htmlFor="type-dag">
                    Dag
                    <input
                      type="radio"
                      id="type-dag"
                      required
                      defaultChecked={person.type === "dag"}
                    />
                  </label>
                  <label htmlFor="type-borrel">
                    Borrel
                    <input type="radio" required defaultChecked={person.type === "borrel"} />
                  </label>
                </fieldset> */}
                <div
                  style={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <button type="button" onClick={() => handleAddPerson(person)}>
                    Opslaan
                  </button>
                  <button type="button" onClick={() => toggleIsOpen(false)}>
                    Sluiten
                  </button>
                  <button disabled type="button">
                    Verwijderen
                  </button>
                </div>
              </fieldset>
            </Form>
          ) : null}
          {!isOpen ? (
            <>
              <h3>{person.name}</h3>
              <button type="button" onClick={() => toggleIsOpen(true)}>
                open
              </button>
            </>
          ) : null}
        </FormWrapper>
      ) : null}
    </div>
  );
};
