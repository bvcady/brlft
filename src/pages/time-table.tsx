import { Item } from "../layout/Item";
import { PageLayout } from "../layout/PageLayout";
import { ScreenWrapper } from "../layout/ScreenWrapper";
import { useLogInCheck } from "../utils/hooks/useLogInCheck";

const TimeTablePage = () => {
  useLogInCheck();

  return (
    <PageLayout>
      <ScreenWrapper>
        <Item>
          <h1>Tijds indeling</h1>
          <p>
            <strong>Hier verschijnt binnenkort meer informatie.</strong>
          </p>
        </Item>
      </ScreenWrapper>
    </PageLayout>
  );
};

export default TimeTablePage;
