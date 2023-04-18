import { Item } from "../layout/Item";
import { PageLayout } from "../layout/PageLayout";
import { ScreenWrapper } from "../layout/ScreenWrapper";
import { theme } from "../styles/theme";
import { useLogInCheck } from "../utils/hooks/useLogInCheck";

const LocatiePage = () => {
  useLogInCheck();

  return (
    <PageLayout>
      <ScreenWrapper>
        <Item>
          <div
            style={{
              position: "relative",
              maxWidth: "100%",
              width: "600px",
              minWidth: "300px",
              aspectRatio: "1.66",
              display: "flex",
              overflow: "hidden",
              borderRadius: "0.25rem",
              justifyContent: "center",
              alignItems: "flex-end",
              backgroundImage:
                'url("https://media.indebuurt.nl/dordrecht/2020/06/08125910/de-eikenhof-scaled.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h1
              style={{
                userSelect: "none",
                transform: "translateY(.25rem)",
                color: theme.colors.background.default,
              }}
            >
              loc<i>a</i>
              <i>t</i>ie
            </h1>
          </div>
        </Item>
        <Item />
        <Item>
          <div
            style={{
              position: "relative",
              maxWidth: "100%",
              width: "600px",
              minWidth: "300px",
              aspectRatio: "1.66",
              display: "flex",
              overflow: "hidden",
              borderRadius: "0.25rem",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              padding: "1rem",
              backgroundImage: 'url("images/plattegrond.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <a href="https://www.google.com/maps/dir//De+Eikenhof,+Dubbeldamseweg+Zuid+362,+3312+KT+Dordrecht/@51.8001174,4.6158151,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x47c428df47c3165d:0x68e31f9b2018855e!2m2!1d4.6858375!2d51.8001292">
              Google Maps
            </a>
          </div>
        </Item>
      </ScreenWrapper>
    </PageLayout>
  );
};

export default LocatiePage;
