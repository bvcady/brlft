import { Item } from "../layout/Item";
import { PageLayout } from "../layout/PageLayout";
import { ScreenWrapper } from "../layout/ScreenWrapper";
import { useLogInCheck } from "../utils/hooks/useLogInCheck";

const ContactPage = () => {
  useLogInCheck();

  return (
    <PageLayout>
      <ScreenWrapper>
        <Item>
          <h1>Contact</h1>
          <p>
            <strong>Hier verschijnt binnenkort meer informatie.</strong>
          </p>
        </Item>

        <Item>
          <p>In de tussen tijd:</p>
          <a href="mailto:willemijn_sneep@hotmail.com">Stuur Willemijn Sneep een mailtje!</a>
        </Item>
      </ScreenWrapper>
    </PageLayout>
  );
};

export default ContactPage;
