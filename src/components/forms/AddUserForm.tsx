import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { FormWrapper } from "./FormWrapper";
import { Toggle } from "../toggle/Toggle";
import { Form } from "./Styled.Form";
import { theme } from "../../styles/theme";
import CheckMark from "../../../public/images/check.svg";
import { Guest, GuestType } from "../../types";

interface GuestResponse {
  data?: Guest;
  message?: string;
  status?: number;
}
const SubmitButton = styled.button`
  margin-inline: auto;
  margin-top: 1rem;
  padding: 1rem;
  border: 2px solid ${theme.colors.secondary.default};
  border-radius: 0.25rem;
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
`;

export const AddUserForm = () => {
  const formRef = useRef<HTMLFormElement>();
  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const router = useRouter();

  const { type: queryType = "" } = router.query;

  const [guestType, setGuestType] = useState<GuestType>(undefined);
  const [formValid, setFormValid] = useState(false);
  const [emailSent, setEmailSent] = useState("");
  const [loading, setLoading] = useState(false);

  const checkQueryType = queryType === "borrel" || queryType === "dag";

  useEffect(() => {
    if (queryType === "borrel" || queryType === "dag") {
      setGuestType(queryType);
    }
  }, [queryType]);

  const handleGuest = async (guest: Guest) => {
    setLoading(true);
    const response = await fetch("/api/guests", { method: "POST", body: JSON.stringify(guest) });
    const data = await response.json();

    const { status }: GuestResponse = data;

    if (status === 200) {
      setEmailSent(guest.email);
    }
    setLoading(false);
  };

  const checkValidity = () => {
    if (formRef.current.checkValidity()) {
      setFormValid(true);
    }
  };

  return (
    <FormWrapper>
      {!emailSent ? (
        <Form
          ref={formRef}
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            if (formValid && guestType) {
              handleGuest({
                name: nameRef.current?.value,
                email: emailRef.current?.value,
                type: guestType,
              });
            }
          }}
        >
          {guestType && formValid && !emailSent ? (
            <div
              style={{
                position: "absolute",
                top: "0.25rem",
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
          <fieldset name="name">
            <legend>Wie ben je?</legend>
            <label htmlFor="name">
              Je naam:
              <input
                onBlur={checkValidity}
                required
                ref={nameRef}
                type="text"
                autoComplete="off"
                data-lpignore="true"
              />
            </label>
            <label htmlFor="email">
              Je email:
              <input
                onBlur={checkValidity}
                required
                ref={emailRef}
                type="email"
                autoComplete="off"
                data-lpignore="true"
              />
            </label>

            <Toggle
              disabled={checkQueryType}
              options={[
                {
                  isActive: guestType === "dag",
                  label: "Dag Gasten",
                  callback: () => setGuestType("dag"),
                },
                {
                  isActive: guestType === "borrel",
                  label: "Borrel Gasten",
                  callback: () => setGuestType("borrel"),
                },
              ]}
            />
          </fieldset>

          <SubmitButton disabled={loading} type="submit">
            {loading ? "..." : "Begin!"}
          </SubmitButton>
        </Form>
      ) : null}
      {emailSent ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            padding: "0 2rem",
          }}
        >
          <img
            src="images/envelope.png"
            alt="envelope"
            style={{ filter: "url(#displacementFilter) blur(0.5px)" }}
          />
          <p>
            <strong>Een email is gestuurd naar {emailSent}</strong>
          </p>
          <p>
            Check binnen nu en 2 minuten jouw inbox en volg de instructies. Als de mail niet in jouw
            inbox zit, kijk dan voor de zekerheid in je ongewenste mail of spam.
            <br />
            <br />
            Als het aanmelden helemaal niet lukt, neem dan contact op met Bob of Lisa.
          </p>
        </div>
      ) : null}
    </FormWrapper>
  );
};
