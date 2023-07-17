import { TimeTable, TimeTableItem } from "../components/timetable/TimeTable";
import { Item } from "../layout/Item";
import { PageLayout } from "../layout/PageLayout";
import { ScreenWrapper } from "../layout/ScreenWrapper";
import { GuestType } from "../types";
import { useGuest } from "../utils/hooks/useGuest";
import { useLogInCheck } from "../utils/hooks/useLogInCheck";

const items: { title: string; type: GuestType; duration: [string, string]; details?: string }[] = [
  {
    title: "inloop",
    type: "dag",
    duration: ["15:00", "16:00"],
    details: "Adres: Dubbeldamseweg Zuid 362",
  },
  { title: "ceremonie", type: "dag", duration: ["16:00", "17:30"] },
  { title: "champagne", type: "dag", duration: ["17:30", "18:00"] },
  { title: "diner", type: "dag", duration: ["18:00", "20:00"] },
  { title: "borrel", type: "borrel", duration: ["20:00", "01:30"] },
];

const TimeTablePage = () => {
  useLogInCheck();
  const { guest } = useGuest();
  return (
    <PageLayout>
      <ScreenWrapper>
        <Item>
          <h1 style={{ marginBottom: "2rem" }}>Time Table</h1>
          <p style={{ maxWidth: "738px", margin: "0 auto" }}>
            Hieronder kun je zien wat er over het verloop van de dag kan worden verwacht aangaande
            de planning. Kom niet te laat!
          </p>
          <TimeTable>
            {items.map((item) => (
              <TimeTableItem guest={guest} key={item.title} {...{ ...item }} />
            ))}
          </TimeTable>
        </Item>
      </ScreenWrapper>
    </PageLayout>
  );
};

export default TimeTablePage;
