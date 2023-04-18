import { useEffect } from "react";
import { useRouter } from "next/router";
import { Item } from "../layout/Item";
import { PageLayout } from "../layout/PageLayout";
import { ScreenWrapper } from "../layout/ScreenWrapper";
import { useGuest } from "../utils/hooks/useGuest";
import { useAllGuests } from "../utils/hooks/useAllGuests";
import { Guest } from "../components/guest/large/Guest";

const AdminPage = () => {
  const adminList = [
    "vlietvanlisa@gmail.com",
    "willemijn_sneep@hotmail.com",
    "bobb.verheij@gmail.com",
  ];

  const { guest } = useGuest();
  const router = useRouter();

  const { guests } = useAllGuests();

  useEffect(() => {
    if (guest?.email) {
      if (!adminList.includes(guest.email)) {
        router.replace("/");
      }
    }
  }, [guest]);

  return (
    <PageLayout>
      {guest ? (
        <ScreenWrapper>
          <Item>
            <h1>For our eyes only</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "2rem 0.24rem",
              }}
            >
              {guests.map((g) => (
                <Guest guest={g} />
              ))}
            </div>
          </Item>
        </ScreenWrapper>
      ) : null}
    </PageLayout>
  );
};

export default AdminPage;
