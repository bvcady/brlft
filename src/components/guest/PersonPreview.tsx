/* eslint-disable @typescript-eslint/no-use-before-define */
import { HTMLInputTypeAttribute, useEffect, useState } from "react";
import styled from "styled-components";
import { ThreeDots } from "react-loading-icons";
import { FormWrapper } from "../forms/FormWrapper";
import { Form } from "../forms/Styled.Form";
import { usePerson } from "../../utils/hooks/usePerson";
import CheckMark from "../../../public/images/check.svg";
import { theme } from "../../styles/theme";
import { GuestType, Person } from "../../types";
import { Modal } from "../modal/Modal";
import { PersonForm } from "../forms/PersonForm";

interface Props {
  index: number;
  person?: Partial<Person>;
  guestType: GuestType;
  refetch: () => Promise<void>;
}

export const PersonPreview = ({ index, guestType, person, refetch }: Props) => {
  const [modalIsOpen, toggleModalIsOpen] = useState(false);

  return (
    <>
      <FormWrapper notInModal style={{ maxWidth: "400px" }}>
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            borderRadius: "1rem",
            background: "#00D100",
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "1.5rem",
            height: "1.5rem",
          }}
        >
          <CheckMark fill="white" width="1rem" />
        </div>
        <>
          <h3>{person.name}</h3>
          <button type="button" onClick={() => toggleModalIsOpen(true)}>
            open
          </button>
        </>
      </FormWrapper>
      {modalIsOpen ? (
        <Modal isActive={modalIsOpen} toggleIsActive={toggleModalIsOpen}>
          <PersonForm
            handleClose={async () => {
              toggleModalIsOpen(false);
              await refetch();
            }}
            guestType={guestType}
            person={person}
            index={index}
          />
        </Modal>
      ) : null}
    </>
  );
};
