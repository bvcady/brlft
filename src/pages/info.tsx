/* eslint-disable no-console */
import { ReactNode } from "react";
import Link from "next/link";
import styled from "styled-components";
import { JaWoord } from "../components/decoration/ja-woord/JaWoord";
import { Item } from "../layout/Item";
import { PageLayout } from "../layout/PageLayout";
import { ScreenWrapper } from "../layout/ScreenWrapper";
import { theme } from "../styles/theme";
import { useLogInCheck } from "../utils/hooks/useLogInCheck";
import { useGuest } from "../utils/hooks/useGuest";
import { Spinner } from "../components/spinner/Spinner";

interface ILink {
  href: string;
  children?: ReactNode;
}

const LinkWrapper = styled.span`
  text-decoration: none;
  font-family: "Courier New", Courier, monospace;
  font-weight: 700;
  color: ${theme.colors.secondary.default};
  text-transform: none;
  font-size: inherit;
`;

const InlineLink = ({ href, children }: ILink) => {
  return (
    <Link href={href}>
      <LinkWrapper>{children}</LinkWrapper>
    </Link>
  );
};

const InfoPage = () => {
  // useLogInCheck();
  const { guest, isLoading, refetch } = useGuest();

  return (
    <PageLayout>
      <ScreenWrapper>
        <Spinner isLoading={isLoading} />
        <JaWoord />

        {guest ? (
          <Item>
            <button type="button" onClick={refetch}>
              refetch
            </button>
            <h2>4 Augustus 2023</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
              }}
            >
              <h3>Hallo {guest.name}</h3>
              <p>
                We nodigen jullie uit om ons 10 jarig samenzijn te vieren op de mooiste dag van ons
                leven - onze trouwdag!
                <br />
                <br />
                Op deze website kun je alle informatie vinden die je nodig hebt om bij onze viering
                aanwezig te zijn. We hebben zorgvuldig op een rijtje gezet wat jullie kunnen
                verwachten van onze bruiloft. Van de locatie tot de tijdsindeling, van dieëtwensen
                tot of jij wilt en kunt helpen op de dag zelf.
                <br />
                <br />
                We kunnen niet wachten om deze speciale dag met jullie te delen en onze liefde voor
                elkaar te vieren. Op deze website kun je je{" "}
                <InlineLink href="/rsvp">RSVP</InlineLink> bevestigen voor jou en doorgeven wie met
                jou naar de dag zelf en / of de borrel komen, zodat wij, onze weddingplanner en onze
                master of ceremony, ons goed kunnen voorbereiden.
                <br />
                <br />
                Als je nog vragen hebt over onze bruiloft of deze website, aarzel dan niet om{" "}
                <InlineLink href="/contact">contact</InlineLink> met Willemijn Sneep op te nemen. We
                kijken er naar uit om samen met jullie een onvergetelijke dag te creëren op onze
                trouwdag!
              </p>
            </div>
          </Item>
        ) : null}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Link href="/rsvp">Meld je aan!</Link>
          <Link href="/locatie">Locatie</Link>
          <Link href="/time-table">Tijd Indeling</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </ScreenWrapper>
    </PageLayout>
  );
};

export default InfoPage;
