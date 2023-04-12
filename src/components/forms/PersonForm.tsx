/* eslint-disable @typescript-eslint/no-use-before-define */
import { HTMLInputTypeAttribute, useEffect, useState } from "react";
import styled from "styled-components";
import { FormWrapper } from "./FormWrapper";
import { Form } from "./Styled.Form";
import { Person } from "../../pages/rsvp";
import { usePerson } from "../../utils/hooks/usePerson";
import CheckMark from "../../../public/images/check.svg";
import Progress from "../../../public/images/progress.svg";
import { theme } from "../../styles/theme";

interface Props {
  index: number;
  initialPerson?: Partial<Person>;
  guestType: "borrel" | "dag";
  handleUpdate: () => void;
  noDelete?: boolean;
}

export const PersonForm = ({ index, initialPerson, guestType, handleUpdate, noDelete }: Props) => {
  const [person, setPerson] = useState<Partial<Person>>(initialPerson);
  const [isOpen, toggleIsOpen] = useState(initialPerson.open);
  const [saved, setSaved] = useState(true);

  const { id } = initialPerson;

  const { add, remove, loading } = usePerson();

  const handleAddPerson = async () => {
    const response = await add(person);
    if (response.ok) {
      toggleIsOpen(false);
      setSaved(true);
      handleUpdate();
    }
  };

  const handleRemovePerson = async () => {
    const response = await remove(person);
    if (response.ok) {
      handleUpdate();
    }
  };

  console.log(guestType);

  return (
    <div>
      {person ? (
        <FormWrapper>
          <div
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              borderRadius: "1rem",
              background: saved ? "#00D100" : "#ddd",
              zIndex: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "1.5rem",
              height: "1.5rem",
            }}
          >
            {saved ? (
              <CheckMark fill="white" width="1rem" />
            ) : (
              <Progress fill={theme.colors.secondary.default} width="1rem" />
            )}
          </div>
          {isOpen ? (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddPerson();
              }}
            >
              <fieldset name="name">
                <legend>
                  Gast {index + 1} ({person.name})
                </legend>
                <Input
                  required
                  id={id}
                  name="name"
                  label="Naam"
                  handleChange={(input: string, key: string) => {
                    setSaved(false);
                    setPerson((prev) => {
                      return { ...prev, [key]: input };
                    });
                  }}
                  defaultValue={person.name}
                />
                <RadioInput
                  id={id}
                  name="type"
                  label="Waar ben je bij?"
                  options={[
                    { value: "dag", label: "Dag!" },
                    { value: "borrel", label: "Borrel!" },
                    { value: "niet", label: "Ik kom helaas niet..." },
                  ].filter((opt) => !(opt.value === "dag" && guestType === "borrel"))}
                  defaultValue={person.type}
                  handleChange={(input: string, key: string) => {
                    setSaved(false);
                    setPerson((prev) => {
                      return { ...prev, [key]: input };
                    });
                  }}
                />
                {person?.type !== "niet" ? (
                  <>
                    <Input
                      id={id}
                      name="diet"
                      label="Diëetwensen"
                      handleChange={(input: string, key: string) => {
                        setSaved(false);
                        setPerson((prev) => {
                          return { ...prev, [key]: input };
                        });
                      }}
                      defaultValue={person.diet}
                    />
                    <Input
                      id={id}
                      type="text-area"
                      name="know"
                      label="Hoe ken je de bruid of bruidegom?"
                      handleChange={(input: string, key: string) => {
                        setSaved(false);
                        setPerson((prev) => {
                          return { ...prev, [key]: input };
                        });
                      }}
                      defaultValue={person.diet}
                    />
                  </>
                ) : null}
                <div
                  style={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <button disabled={loading} type="submit">
                    {loading ? "..." : "Opslaan"}
                  </button>
                  <button type="button" onClick={() => toggleIsOpen(false)}>
                    Sluiten
                  </button>
                  <button disabled={noDelete} type="button" onClick={handleRemovePerson}>
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

interface InputProps {
  id: string;
  name: string;
  label: string;
  defaultValue: string;
  handleChange: (input: string, key: string) => void;
  required?: boolean;
  type?: HTMLInputTypeAttribute | "text-area";
}

const Input = ({
  id,
  name,
  label,
  handleChange,
  defaultValue,
  required,
  type = "text",
}: InputProps) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <label htmlFor={name}>
      {label}:{required && "*"}
      {type !== "text-area" ? (
        <input
          value={value}
          id={`${id}-${name}`}
          name={`${id}-${name}`}
          type={type}
          required={required}
          onChange={({ target }) => {
            const { value: val } = target;
            setValue(val);
            handleChange(val, name);
          }}
        />
      ) : null}
      {type === "text-area" ? (
        <textarea
          style={{ resize: "vertical" }}
          value={value}
          id={`${id}-${name}`}
          name={`${id}-${name}`}
          required={required}
          onChange={({ target }) => {
            const { value: val } = target;
            setValue(val);
            handleChange(val, name);
          }}
        />
      ) : null}
    </label>
  );
};

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  width: clamp(100px, 100%, 450px);
  padding: 0.5rem;
  gap: 0.25rem;
  p {
    font-size: 1rem;
  }

  label {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    margin: 0;
    padding: 0;
    border: 2px solid ${theme.colors.secondary.default};
    border-radius: 0.25rem;

    input {
      margin: 0.5rem;
    }
  }
`;

interface RadioProps {
  id: string;
  name: string;
  label: string;
  handleChange: (input: string, key: string) => void;
  options: { value: string; label: string }[];
  defaultValue: string;
}

const RadioInput = ({ id, name, label, handleChange, options, defaultValue }: RadioProps) => {
  const [checked, setChecked] = useState(defaultValue);

  useEffect(() => {
    if (checked) {
      handleChange(checked, name);
    }
  }, [checked]);

  return (
    <RadioGroup>
      <p>{label}</p>
      {options.map((opt) => (
        <label key={opt.value} htmlFor={`${id}-${opt.value}`}>
          <input
            id={`${id}-${opt.value}`}
            name={`${id}-${opt.value}`}
            type="radio"
            checked={checked === opt.value}
            onChange={(e) => {
              if (e.target.value) setChecked(opt.value);
            }}
          />
          {opt.label}
        </label>
      ))}
    </RadioGroup>
  );
};
