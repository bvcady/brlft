import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { FormWrapper } from "./FormWrapper";
import { Toggle } from "../toggle/Toggle";
import { Form } from "./Styled.Form";
import { useLocalStorage } from "../../utils/hooks/useLocalStorage";

interface GuestProps {
  user: {
    name: string;
    email: string;
    type: "borrel" | "dag";
  };
}
interface GuestResponse {
  status?: number;
  errors?: Array<{ message: string }>;
}

const SubmitButton = styled.button`
  margin: 1rem auto;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.secondary.default};
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

    console.log({ data });

    const { status, errors }: GuestResponse = data;

    if (status === 200) {
      setEmailSent(user.email);
    }
  };

  return (
    <FormWrapper>
      {!emailSent ? (
        <Form
          ref={formRef}
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            const isValid = formRef.current.checkValidity();
            if (isValid) {
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
          <fieldset name="dietaryWishes">
            <legend>Wie ben je?</legend>
            <label htmlFor="name">
              Je naam:
              <input required ref={nameRef} type="text" autoComplete="off" data-lpignore="true" />
            </label>
            <label htmlFor="email">
              Je email:
              <input required ref={emailRef} type="email" autoComplete="off" data-lpignore="true" />
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
          {guestType ? <SubmitButton type="submit">Begin!</SubmitButton> : null}
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
