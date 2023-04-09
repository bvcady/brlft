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
  name: string;
  origin: string;
  token: string;
}

export const MagicLinkEmail = ({ name, origin, token }: MagicLinkEmailProps) => {
  const redirect = `${origin}${token ? `/auth/?token=${token}` : ""}`;
  return (
    <Html>
      <Head />
      <Preview>{`${name}, log in met deze 'magic' link`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://www.brlft.nl/images/bob-en-lisa.png"
            alt="Lisa en Bob"
            style={{ margin: "0 auto", maxWidth: "250px", width: "90vw" }}
          />
          <Heading style={h1}>Hoi {name}! </Heading>
          <Heading style={h2}>Je bent welkom op de bruiloft van Lisa en Bob. </Heading>
          <Text style={{ ...text }}>
            Fijn om te zien dat onze uitnodiging goed bij je terecht is gekomen.
          </Text>
          <Text style={{ ...text }}>
            Om te weten te komen wie er allemaal wel, of niet, kunnen komen naar onze bruiloft
            willen dit graag registreren op basis van jouw email adres:
          </Text>
          <Link
            href={redirect}
            target="_blank"
            style={{
              ...magicLink,
              display: "block",
            }}
          >
            Klik hier!
            <i style={{ color: "#230478" }} />
          </Link>
        </Container>
        <Container style={container}>
          <Text style={{ ...text }}>
            Of vul deze code in op{" "}
            <Link style={link} href="https://brlft.nl/validate-code">
              onze website
            </Link>
            :
          </Text>
          <Text style={code}>{token}</Text>
        </Container>
        <Container style={container}>
          <Text
            style={{
              ...text,
              color: "#ababab",
            }}
          >
            Als je niet probeerde in te loggen, dan kun je deze mail veilig negeren.
          </Text>
          <Text style={footer}>
            <Link href="https://notion.so" target="_blank" style={{ ...link }}>
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
};

export default MagicLinkEmail;

const main = {
  fontFamily: `Courier New`,
  backgroundColor: "#e9efff",
  color: "#230478",
  backgroundImage: "url(https://www.brlft.nl/images/flakes.png)",
  backgroundPosition: "center",
  backgroundSize: "cover",
  padding: "4rem 1rem",
  height: "fit-content",
};

const container = {
  boxShadow: "0 0 0.5rem 0 rgba(0, 0, 0, 0.2)",
  padding: "2rem",
  margin: "1rem auto",
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

const h2 = {
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
  padding: ".75rem 1.5rem",
  borderRadius: "0.25rem",
  color: "white",
  width: "fit-content",
  fontSize: "14px",
  margin: "0 auto",
};

const text = {
  fontSize: "14px",
};

const footer = {
  color: "#898989",
  fontSize: "12px",
  lineHeight: "22px",
};

const code = {
  overflow: "scroll",
  width: "250px",
  border: "2px solid #ff801d",
  display: "block",
  padding: "1rem",
  margin: "0 auto",
  backgroundColor: "#f4f4f4",
  borderRadius: "5px",
  color: "#333",
};
