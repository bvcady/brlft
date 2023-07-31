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
            <strong>Willemijn Sneep</strong> heeft in aanloop naar de bruiloft informatie gedeel via
            het email adres waarmee je bent aangemeld. Mocht je toch meer vragen hebben, stuur haar
            graag een mailtje.
            <br />
            <br />
            Informatie voor de planning en parkeren kun je vinden op de andere paginas van deze
            website.
          </p>
        </Item>

        <Item>
          <p>Mail</p>
          <br />
          <a href="mailto:willemijn_sneep@hotmail.com">Willemijn Sneep.</a>
        </Item>
      </ScreenWrapper>
    </PageLayout>
  );
};

export default ContactPage;
