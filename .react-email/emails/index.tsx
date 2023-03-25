/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface MagicLinkEmailProps {
  guest: { firstName: string; lastName?: string };
  token?: string;
}

export const MagicLinkEmail = ({
  guest = { firstName: "Bob" },
  token = "TEMP TOKEN",
}: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>{`Log in met deze 'magic' link`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://www.brlft.nl/images/bob-en-lisa.png"
          alt="Lisa en Bob"
          style={{ margin: "0 auto", maxWidth: "250px", width: "90vw" }}
        />
        <Heading style={h1}>Hoi {guest.firstName}!</Heading>
        <Heading style={h2}>Je bent welkom op de bruiloft van Lisa en Bob!</Heading>
        <Text style={{ ...text }}>
          Fijn om te zien dat onze uitnodiging goed bij je terecht is gekomen.
        </Text>
        <Text style={{ ...text }}>
          Om te weten te komen wie er allemaal wel, of niet, kunnen komen naar onze bruiloft willen
          dit graag registreren op basis van jouw email adres:
        </Text>
        <Link
          href={`https://brlft.nl${token ? `?token=${token}` : ""}`}
          target="_blank"
          style={{
            ...magicLink,
            display: "block",
          }}
        >
          Klik hier om in te loggen voor onze bruiloft{" "}
          <i style={{ color: "#230478" }}>(brlft.nl)</i>
        </Link>
        <Text style={{ ...text }}>Of kopieer deze tekst:</Text>
        <code style={code}>{token}</code>
        <Text
          style={{
            ...text,
            color: "#ababab",
            marginTop: "14px",
            marginBottom: "16px",
          }}
        >
          Als je niet probeerde in te loggen, dan kun je deze mail veilig negeren.
        </Text>
        {/* <Text
          style={{
            ...text,
            color: "#ababab",
            marginTop: "12px",
            marginBottom: "38px",
          }}
        >
          Hint: You can set a permanent password in Settings & members → My account.
        </Text> */}
        <Text style={footer}>
          <Link href="https://notion.so" target="_blank" style={{ ...link, color: "#898989" }}>
            brlft.nl
          </Link>
          , voor het plannen van een bruiloft
          <br />
          Bob en Lisa heten je van harte welkom
        </Text>
      </Container>
    </Body>
  </Html>
);

export default MagicLinkEmail;

const main = {
  fontFamily: `Courier New`,
  backgroundColor: "#e9efff",
  color: "#230478",
  backgroundImage: "url(https://www.brlft.nl/images/flakes.png)",
  backgroundPosition: "center",
  backgroundSize: "cover",
  padding: "5rem 1rem",
};

const container = {
  boxShadow: "0 0 0.5rem 0 rgba(0, 0, 0, 0.2)",
  padding: "2rem",
  margin: "0 auto",
  borderRadius: "0.25rem",
  backgroundColor: "rgba(255,255,255,0.85)",
};

const h1 = {
  fontFamily: "Arial",
  fontSize: "32px",
  fontWeight: "bold",
  padding: "0",
  margin: 0,
};

const h2: React.CSSProperties = {
  fontFamily: "Arial",
  fontSize: "20px",
  fontWeight: "bold",
  padding: "0",
  maxWidth: "300px",
  fontStyle: "italic",
};

const link = {
  color: "#ff801d",
  fontSize: "14px",
  textDecoration: "underline",
};

const magicLink = {
  backgroundColor: "#ff801d",
  padding: ".5rem 1rem",
  borderRadius: "0.25rem",
  color: "white",
  width: "fit-content",
  fontSize: "14px",
};

const text = {
  fontSize: "14px",
  margin: "1rem 0",
};

const footer = {
  color: "#898989",
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "12px",
  marginBottom: "24px",
};

const code = {
  display: "inline-block",
  padding: "16px 4.5%",
  width: "90.5%",
  backgroundColor: "#f4f4f4",
  borderRadius: "5px",
  border: "1px solid #eee",
  color: "#333",
};
