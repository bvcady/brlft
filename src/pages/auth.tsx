import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PageLayout } from "../layout/PageLayout";
import { ScreenWrapper } from "../layout/ScreenWrapper";
import { Loader } from "../components/loader/Loader";

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
        {errorMessage ? <h3>{errorMessage}</h3> : null}
        {!errorMessage ? (
          <Loader
            onFinished={() => {
              router.push("/aanmelden");
            }}
          />
        ) : null}
      </ScreenWrapper>
    </PageLayout>
  );
};

export default AuthPage;
