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
import { SortButton } from "../components/buttons/SortButton";

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
  const [sortValue, setSortValue] = useState("recent");
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
  const sortProps = { sortValue, setSortValue, sortOrder, setSortOrder };
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
              columnGap: "0.5rem",
              rowGap: "0.25rem",
              padding: "1rem",
              background: "white",
              borderRadius: "0.25rem",
              margin: "1rem auto",
              width: "100%",
              maxWidth: "600px",
              flexFlow: "row wrap",
            }}
          >
            <p style={{ gridColumn: "1 / span 3" }}>Sorteer gasten:</p>
            <SortButton {...{ ...sortProps }} name="type">
              type
            </SortButton>
            <SortButton {...{ ...sortProps }} name="name">
              naam
            </SortButton>
            <SortButton {...{ ...sortProps }} name="email">
              mail geopend
            </SortButton>
            <SortButton {...{ ...sortProps }} name="people">
              wel/niet
            </SortButton>
            <SortButton {...{ ...sortProps }} name="recent">
              recent
            </SortButton>
            <button
              style={{ gridColumn: "1 / span 3", marginTop: "1rem", marginLeft: "auto" }}
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
