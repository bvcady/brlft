/* eslint-disable no-console */
import { ReactNode } from "react";
import Link from "next/link";
import styled from "styled-components";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import { JaWoord } from "../components/decoration/ja-woord/JaWoord";
import { Item } from "../layout/Item";
import { PageLayout } from "../layout/PageLayout";
import { ScreenWrapper } from "../layout/ScreenWrapper";
import { theme } from "../styles/theme";
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
  color: ${theme.colors.main.default};
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
  const { guest, isLoading } = useGuest();

  return (
    <PageLayout>
      <ScreenWrapper>
        <Spinner isLoading={isLoading} />
        <JaWoord />

        {guest ? (
          <Item>
            <div style={{ paddingBottom: "2rem" }}>
              <AddToCalendarButton
                size="5"
                hideBackground
                hideCheckmark
                hideIconButton
                hideBranding
                trigger="click"
                language="nl"
                buttonStyle="date"
                listStyle="modal"
                name="Bruiloft Lisa en Bob"
                startDate="2023-08-04"
                startTime={guest?.type === "dag" ? "15:00" : "20:00"}
                options={["Apple", "Google", "Yahoo", "Microsoft365", "Outlook.com"]}
                endTime="23:00"
                timeZone="Europe/Amsterdam"
                styleLight={`--date-btn-text: ${theme.colors.secondary.default}; --date-btn-text-secondary: ${theme.colors.secondary.default}; --date-btn-cal-background: ${theme.colors.secondary.default}; --date-btn-background: white; --font: "Courier New", Courier, monospace; --list-background: ${theme.colors.background.default}; --list-background-hover: ${theme.colors.accent.default}; --date-btn-shadow: unset; --date-btn-shadow-hover: unset; --btn-shadow: none; --btn-shadow-hover: none`}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <h3>Hallo {guest.name}</h3>
              <p>
                We nodigen jullie uit om ons 10 jarig samenzijn te vieren op de mooiste dag van ons
                leven - onze trouwdag!
              </p>
              <p>
                Op deze website kun je alle informatie vinden die je nodig hebt om bij onze viering
                aanwezig te zijn. We hebben zorgvuldig op een rijtje gezet wat jullie kunnen
                verwachten van onze bruiloft. Van de locatie tot de tijdsindeling, van dieëtwensen
                tot of jij wilt en kunt helpen op de dag zelf.
              </p>
              <p>
                We kunnen niet wachten om deze speciale dag met jullie te delen en onze liefde voor
                elkaar te vieren. Op deze website kun je je{" "}
                <InlineLink href="/rsvp">RSVP</InlineLink> bevestigen voor jou en doorgeven wie met
                jou naar de dag zelf en / of de borrel komen, zodat wij, onze weddingplanner en onze
                master of ceremony, ons goed kunnen voorbereiden.
              </p>
              <p>
                Als je nog vragen hebt over onze bruiloft of deze website, aarzel dan niet om{" "}
                <InlineLink href="/contact">contact</InlineLink> met Willemijn Sneep op te nemen. We
                kijken er naar uit om samen met jullie een onvergetelijke dag te creëren op onze
                trouwdag!
              </p>
              <p>Veel liefs, Lisa van Vliet en Bob Verheij</p>
            </div>
          </Item>
        ) : null}
      </ScreenWrapper>
    </PageLayout>
  );
};

export default InfoPage;
