/* eslint-disable no-console */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PageLayout } from "../layout/PageLayout";
import { ScreenWrapper } from "../layout/ScreenWrapper";
import { Loader } from "../components/loader/Loader";
import { Item } from "../layout/Item";

const AuthPage = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const { token } = router.query;

  const handleValidateToken = async (_token: string) => {
    const body = JSON.stringify({ token: _token });

    const response = await fetch("/api/validate/", {
      method: "POST",
      body,
    });

    if (!response.ok) {
      const { message } = await response.json();
      setErrorMessage(message);
    }
  };

  useEffect(() => {
    if (token) {
      handleValidateToken(token as string).catch((e) => console.error(e));
    }
  }, [token]);

  return (
    <PageLayout>
      <ScreenWrapper>
        {token ? (
          <Item>
            {errorMessage ? (
              <>
                <p>
                  Er is iets mis gegaan. Het kan zijn dat de email link in de tussen tijd verlopen
                  is.
                </p>
                <Link href="/">Klik hier om terug te gaan naar de aanmeld pagina.</Link>
              </>
            ) : null}
            {!errorMessage ? (
              <Loader
                onFinished={() => {
                  router.replace("/info");
                }}
              />
            ) : null}
          </Item>
        ) : null}
      </ScreenWrapper>
    </PageLayout>
  );
};

export default AuthPage;
