/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { RandomImage } from "../components/decoration/random-image/RandomImage";
import { PersonForm } from "../components/forms/PersonForm";
import { Spinner } from "../components/spinner/Spinner";
import { Item } from "../layout/Item";
import { PageLayout } from "../layout/PageLayout";
import { ScreenWrapper } from "../layout/ScreenWrapper";
import { useGuest } from "../utils/hooks/useGuest";
import { MiniPerson } from "../components/guest/mini/MiniPerson";
import { theme } from "../styles/theme";
import { Person } from "../types";

const RSVPPage = () => {
  const { guest, isLoading, refetch } = useGuest();

  const defaultPerson = {
    name: guest?.name,
    type: guest?.type,
  } as Partial<Person>;

  const [people, setPeople] = useState<Partial<Person>[]>([]);
  const [addVisible, toggleAddVisible] = useState(true);

  useEffect(() => {
    if (guest) {
      setPeople(guest.people || [{ ...defaultPerson, id: v4(), open: true }]);
    }
  }, [guest]);

  const handleAddNewPerson = () => {
    toggleAddVisible(false);
    setPeople((prev) => [...prev, { ...defaultPerson, id: v4(), open: true }]);
  };

  const handleUpdate = () => {
    refetch();
    toggleAddVisible(true);
  };

  return (
    <PageLayout>
      <ScreenWrapper>
        <Spinner isLoading={isLoading} />
        <RandomImage style={{ filter: "url(#displacementFilter)" }} />
        <h1>RSVP</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          {people.map((p) => (
            <MiniPerson key={p.name} name={p.name} />
          ))}
        </div>
        <Item>
          <p style={{ maxWidth: "738px", margin: "0 auto" }}>
            Hier kun je aangeven met hoeveel mensen je komt. Geef ook voor jezelf aan of je er bij
            bent. Kinderen zijn welkom en geef deze ook aan in het overzicht, alstublieft. Wanneer
            je aanpassingen zijn gedaan verschijnt er een vinkje in de rechter bovenhoek.
          </p>
          {people.map((p, index) => (
            <PersonForm
              noDelete={!guest?.people?.find((gp) => gp.id === p.id)}
              key={p.id}
              initialPerson={p}
              index={index}
              guestType={guest?.type}
              handleUpdate={handleUpdate}
            />
          ))}
          {addVisible ? (
            <button
              style={{
                padding: "1rem",
                border: `2px solid ${theme.colors.secondary.default}`,
                margin: "1rem 0",
                borderRadius: "0.25rem",
              }}
              type="button"
              onClick={handleAddNewPerson}
            >
              Voeg een gast toe!
            </button>
          ) : null}
        </Item>
      </ScreenWrapper>
    </PageLayout>
  );
};

export default RSVPPage;
