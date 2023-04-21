import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Item } from "../layout/Item";
import { PageLayout } from "../layout/PageLayout";
import { ScreenWrapper } from "../layout/ScreenWrapper";
import { useGuest } from "../utils/hooks/useGuest";
import { useAllGuests } from "../utils/hooks/useAllGuests";
import { Guest } from "../components/guest/large/Guest";
import { theme } from "../styles/theme";
import { useDownload } from "../utils/hooks/useDownload";

const AdminPage = () => {
  const adminList = [
    "vlietvanlisa@gmail.com",
    "willemijn_sneep@hotmail.com",
    "bobb.verheij@gmail.com",
  ];

  const { guest } = useGuest();
  const router = useRouter();

  const { guests } = useAllGuests();
  const { download, loading } = useDownload();
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    if (guest?.email) {
      if (!adminList.includes(guest.email)) {
        router.replace("/");
      }
    }
  }, [guest]);

  const sortedGuests = [...guests].sort((a, b) => {
    if (sortValue === "type") {
      return b.type.localeCompare(a.type);
    }
    if (sortValue === "name") {
      return b.name.localeCompare(a.name);
    }
    if (sortValue === "email") {
      return b.email.localeCompare(a.email);
    }
    if (sortValue === "people") {
      return (
        (b.people?.filter((p) => p.type !== "niet").length || 0) -
        (a.people?.filter((p) => p.type !== "niet").length || 0)
      );
    }

    return -1;
  });

  return (
    <PageLayout>
      {guest ? (
        <ScreenWrapper>
          <Item>
            <h1>For our eyes only</h1>
            <p>
              Totaal aantal gasten:
              {guests?.reduce(
                (acc, g) => acc + (g.people?.filter((p) => p.type !== "niet").length || 0),
                0,
              )}
            </p>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                padding: "1rem",
                background: "white",
                borderRadius: "0.25rem",
                margin: "1rem auto",
                width: "100%",
                maxWidth: "738px",
                flexFlow: "row wrap",
              }}
            >
              <p>Sorteer gasten:</p>
              <button
                onClick={() => setSortValue("type")}
                type="button"
                style={{
                  color:
                    sortValue === "type"
                      ? theme.colors.main.default
                      : theme.colors.secondary.default,
                }}
              >
                type
              </button>
              <button
                onClick={() => setSortValue("name")}
                type="button"
                style={{
                  color:
                    sortValue === "name"
                      ? theme.colors.main.default
                      : theme.colors.secondary.default,
                }}
              >
                naam
              </button>
              <button
                onClick={() => setSortValue("email")}
                type="button"
                style={{
                  color:
                    sortValue === "email"
                      ? theme.colors.main.default
                      : theme.colors.secondary.default,
                }}
              >
                email
              </button>
              <button
                onClick={() => setSortValue("people")}
                type="button"
                style={{
                  color:
                    sortValue === "people"
                      ? theme.colors.main.default
                      : theme.colors.secondary.default,
                }}
              >
                aantal
              </button>
              <button
                onClick={() => setSortValue("")}
                type="button"
                style={{
                  color:
                    sortValue === "" ? theme.colors.main.default : theme.colors.secondary.default,
                }}
              >
                recent
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  download();
                }}
              >
                {loading ? "..." : `Download alle gasten als .csv bestand.`}
              </button>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "2rem 0.24rem",
                gap: "1rem",
              }}
            >
              {sortedGuests.map((g) => (
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
