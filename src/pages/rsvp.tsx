/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { RandomImage } from "../components/decoration/random-image/RandomImage";
import { Spinner } from "../components/spinner/Spinner";
import { Item } from "../layout/Item";
import { PageLayout } from "../layout/PageLayout";
import { ScreenWrapper } from "../layout/ScreenWrapper";
import { useGuest } from "../utils/hooks/useGuest";
import { MiniPerson } from "../components/guest/mini/MiniPerson";
import { theme } from "../styles/theme";
import { Person } from "../types";
import { Modal } from "../components/modal/Modal";
import { PersonPreview } from "../components/guest/PersonPreview";
import { PersonForm } from "../components/forms/PersonForm";

const RSVPPage = () => {
  const { guest, isLoading, refetch } = useGuest();

  const defaultPerson = {
    type: guest?.type,
  } as Partial<Person>;

  const [people, setPeople] = useState<Partial<Person>[]>([]);

  const [modalActive, toggleModalActive] = useState(false);

  useEffect(() => {
    if (guest) {
      setPeople(guest.people || []);
    }
  }, [guest]);

  useEffect(() => {
    if (!modalActive) {
      refetch().catch((e) => console.error(e));
    }
  }, [modalActive]);

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
        <Item style={{ gap: "1rem" }}>
          <p style={{ maxWidth: "738px", margin: "0 auto" }}>
            Hier kun je aangeven met hoeveel mensen je komt. Geef ook voor jezelf aan of je er bij
            bent. Kinderen zijn welkom en geef deze ook aan in het overzicht, alstublieft. Als een
            gast correct is toegevoegd, verschijnt er een vinkje in de rechter bovenhoek.
          </p>

          {people.map((p, index) => (
            <PersonPreview
              key={p.id}
              person={p}
              index={index}
              guestType={guest?.type}
              refetch={refetch}
            />
          ))}

          <button
            style={{
              padding: "1rem",
              border: `2px solid ${theme.colors.secondary.default}`,
              margin: "1rem 0",
              borderRadius: "0.25rem",
            }}
            type="button"
            onClick={() => toggleModalActive(true)}
          >
            Voeg een gast toe!
          </button>
        </Item>
        {modalActive ? (
          <Modal isActive={modalActive} toggleIsActive={toggleModalActive}>
            <PersonForm
              noDelete
              handleClose={async () => {
                await refetch();
                toggleModalActive(false);
              }}
              index={guest?.people?.length || 0}
              person={{ ...defaultPerson, id: v4() }}
              guestType={guest?.type}
            />
          </Modal>
        ) : null}
      </ScreenWrapper>
    </PageLayout>
  );
};

export default RSVPPage;
