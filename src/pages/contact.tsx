import { PageLayout } from "../layout/PageLayout";
import { ScreenWrapper } from "../layout/ScreenWrapper";
import { useLogInCheck } from "../utils/hooks/useLogInCheck";

const ContactPage = () => {
  useLogInCheck();

  return (
    <PageLayout>
      <ScreenWrapper>tbd</ScreenWrapper>
    </PageLayout>
  );
};

export default ContactPage;
