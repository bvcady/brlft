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

export type Person = {
  id: string;
  name: string;
  open?: boolean;
  type: "borrel" | "dag";
  diet?: string;
  know?: string;
  help?: string;
};

const RSVPPage = () => {
  const { guest, isLoading, refetch } = useGuest();

  const defaultPerson = {
    name: guest?.name,
    type: guest?.type,
  } as Partial<Person>;

  const [people, setPeople] = useState<Partial<Person>[]>([]);

  useEffect(() => {
    if (guest) {
      setPeople(guest.people || [{ ...defaultPerson, id: v4(), open: true }]);
    }
  }, [guest]);

  const handleAddPerson = async (person: Partial<Person>) => {
    console.log(person);
    const response = await fetch("/api/guests/add", {
      method: "POST",
      body: JSON.stringify((({ open, ...rest }) => rest)(person)),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      await refetch();
    }
  };

  const handleAddNewPerson = () => {
    setPeople((prev) => [...prev, { ...defaultPerson, id: v4(), open: true }]);
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
          <p>
            Hier kun je aangeven met hoeveel mensen je komt. Geef ook voor jezelf aan of je er bij
            bent.
          </p>
          {people.map((p, index) => (
            <PersonForm
              key={p.id}
              initialPerson={p}
              index={index}
              handleAddPerson={handleAddPerson}
            />
          ))}
          <button type="button" onClick={handleAddNewPerson}>
            +
          </button>
        </Item>
      </ScreenWrapper>
    </PageLayout>
  );
};

export default RSVPPage;
