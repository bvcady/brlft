import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingIcons from "react-loading-icons";
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

  const { guest, isLoading } = useGuest();
  const router = useRouter();

  const { guests } = useAllGuests();
  const { download, loading } = useDownload();
  const [sortValue, setSortValue] = useState("");
  const [sortOrder, setSortOrder] = useState(-1);

  useEffect(() => {
    if (guest?.email) {
      if (!adminList.includes(guest.email)) {
        router.replace("/");
      }
    }
  }, [guest]);

  const sortedGuests = [...guests].sort((a, b) => {
    if (sortValue === "type") {
      return b.type.localeCompare(a.type) * sortOrder;
    }
    if (sortValue === "name") {
      return b.name.localeCompare(a.name) * sortOrder;
    }
    if (sortValue === "email") {
      return (a.validated || a.people?.length ? -1 : 1) * sortOrder;
    }
    if (sortValue === "people") {
      if (sortOrder === 1) {
        return a.people?.every((p) => p.type === "niet") ? -1 : 1;
      }
      return a.people?.some((p) => p.type !== "niet") ? -1 : 1;
    }

    return sortOrder;
  });

  return (
    <PageLayout>
      <ScreenWrapper>
        <Item>
          <h1>For our eyes only</h1>
          <p>
            Totaal aantal gasten:{" "}
            {guests?.reduce(
              (acc, g) => acc + (g.people?.filter((p) => p.type !== "niet").length || 0),
              0,
            )}
            , mogelijk{" "}
            {guests?.reduce((acc, g) => {
              if (!g.people) {
                return acc + 1;
              }
              if (g.people?.every((p) => p.type === "niet")) {
                return acc;
              }
              return acc + (g.people?.filter((p) => p.type !== "niet").length || 0);
            }, 0)}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              overflow: "hidden",
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
            <p style={{ gridColumn: "1 / span 3" }}>Sorteer gasten:</p>
            <button
              onClick={() => setSortValue("type")}
              type="button"
              style={{
                color:
                  sortValue === "type" ? theme.colors.main.default : theme.colors.secondary.default,
              }}
            >
              type
            </button>
            <button
              onClick={() => setSortValue("name")}
              type="button"
              style={{
                color:
                  sortValue === "name" ? theme.colors.main.default : theme.colors.secondary.default,
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
              mail geopend
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
              wel/niet
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
              onClick={() => setSortOrder((prev) => prev * -1)}
              type="button"
              style={{
                color: theme.colors.secondary.default,
              }}
            >
              reverse order
            </button>
            <button
              style={{ gridColumn: "1 / span 3" }}
              type="button"
              disabled={loading}
              onClick={() => {
                download();
              }}
            >
              {loading ? "..." : `Download alle gasten als .csv bestand.`}
            </button>
          </div>

          {!isLoading ? (
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
                <Guest key={g.email} guest={g} />
              ))}
            </div>
          ) : (
            <LoadingIcons.Puff />
          )}
        </Item>
      </ScreenWrapper>
    </PageLayout>
  );
};

export default AdminPage;
