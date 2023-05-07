/* eslint-disable @typescript-eslint/no-use-before-define */
import { HTMLInputTypeAttribute, useEffect, useState } from "react";
import styled from "styled-components";
import { FormWrapper } from "./FormWrapper";
import { GuestType, Person } from "../../types";
import { theme } from "../../styles/theme";
import { Form } from "./Styled.Form";
import { usePerson } from "../../utils/hooks/usePerson";

interface IPForm {
  guestType: GuestType;
  person: Partial<Person>;
  index: number;
  handleClose: () => void;
  noDelete?: boolean;
}

export const PersonForm = ({ index, guestType, noDelete, handleClose, ...props }: IPForm) => {
  const [person, setPerson] = useState(props.person);
  const [error, setError] = useState("");
  const { id } = person;
  const { add, remove, loading } = usePerson();

  useEffect(() => {
    console.log("Person changed", person);
  }, [person]);

  const handleAddPerson = async () => {
    const res = await add(person);
    if (res?.status !== 200) {
      return setError("Something went wrong... please try again.");
    }
    setError("");
    return handleClose();
  };

  const handleRemovePerson = async () => {
    const res = await remove(person);
    if (res?.status !== 200) {
      return setError("Something went wrong... please try again.");
    }
    setError("");
    return handleClose();
  };

  return (
    <FormWrapper>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddPerson();
        }}
      >
        {error ? <p>{error}</p> : null}
        <fieldset name="name">
          <legend>
            Gast {index + 1} {person.name ? `(${person.name})` : ""}
          </legend>
          <Input
            required
            id={id}
            name="name"
            label="Naam"
            handleChange={(input: string, key: string) => {
              setPerson((prev) => {
                return { ...prev, [key]: input };
              });
            }}
            defaultValue={props.person.name}
          />
          <RadioInput
            id={id}
            required
            name="type"
            label="Waar ben je bij?"
            options={[
              { value: "dag", label: "Dag!" },
              { value: "borrel", label: "Borrel!" },
              { value: "niet", label: "Ik kom helaas niet..." },
            ].filter((opt) => !(opt.value === "dag" && guestType === "borrel"))}
            defaultValue={person.type}
            handleChange={(input: string, key: string) => {
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
                  setPerson((prev) => {
                    return { ...prev, [key]: input };
                  });
                }}
                defaultValue={person.know}
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
            {!noDelete ? (
              <button disabled={loading} type="button" onClick={handleRemovePerson}>
                Verwijderen
              </button>
            ) : null}
            <button disabled={loading} type="button" onClick={handleClose}>
              Sluiten
            </button>
          </div>
        </fieldset>
      </Form>
    </FormWrapper>
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
  defaultValue: string;
  handleChange: (input: string, key: string) => void;
  id: string;
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
}

const RadioInput = ({
  defaultValue,
  handleChange,
  id,
  label,
  name,
  options,
  required,
}: RadioProps) => {
  const [checked, setChecked] = useState(defaultValue);

  useEffect(() => {
    if (checked) {
      handleChange(checked, name);
    }
  }, [checked]);

  return (
    <RadioGroup>
      <p>
        {label}
        {required && "*"}
      </p>
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
