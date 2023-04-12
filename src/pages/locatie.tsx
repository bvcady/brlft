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
              borderRadius: "0.5rem",
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
      </ScreenWrapper>
    </PageLayout>
  );
};

export default LocatiePage;
