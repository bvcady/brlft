import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Hearts } from "react-loading-icons";
import { FormWrapper } from "./FormWrapper";
import { Toggle } from "../toggle/Toggle";
import { Form } from "./Styled.Form";
import { theme } from "../../styles/theme";
import CheckMark from "../../../public/images/check.svg";

interface GuestProps {
  user: {
    name: string;
    email: string;
    type: "borrel" | "dag";
  };
}
interface GuestResponse {
  status?: number;
  message?: string;
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

type GuestType = "dag" | "borrel" | undefined;

export const AddUserForm = () => {
  const formRef = useRef<HTMLFormElement>();
  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const router = useRouter();

  const { type: queryType = "" } = router.query;

  const [guestType, setGuestType] = useState<GuestType>(undefined);
  const [formValid, setFormValid] = useState(false);
  const [emailSent, setEmailSent] = useState("");

  const checkQueryType = queryType === "borrel" || queryType === "dag";

  useEffect(() => {
    if (queryType === "borrel" || queryType === "dag") {
      setGuestType(queryType);
    }
  }, [queryType]);

  const handleGuest = async ({ user }: GuestProps) => {
    const response = await fetch("/api/guests", { method: "POST", body: JSON.stringify(user) });
    const data = await response.json();

    const { status }: GuestResponse = data;

    if (status === 200) {
      setEmailSent(user.email);
    }
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
                user: {
                  name: nameRef.current?.value,
                  email: emailRef.current?.value,
                  type: guestType,
                },
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

          <SubmitButton type="submit">
            {guestType && formValid && !emailSent ? (
              `Begin!`
            ) : (
              <Hearts
                width="2rem"
                height="1rem"
                style={{ margin: "0", padding: "0" }}
                fill={theme.colors.secondary.default}
              />
            )}
          </SubmitButton>
        </Form>
      ) : null}
      {emailSent ? (
        <div>
          <img src="images/envelope.png" alt="envelope" />
          <p>
            <strong>Een email is gestuurd naar {emailSent}</strong>
          </p>
          <p>Check je inbox en volg de instructies.</p>
        </div>
      ) : null}
    </FormWrapper>
  );
};
