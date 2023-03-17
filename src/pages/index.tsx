import { PageLayout } from "../layout/PageLayout";
import { HomeScreen } from "../screens/HomeScreen";

const Home = () => {
  const handleAddMockGuest = async () => {
    console.log(
      await (
        await fetch("/api/guests/", {
          method: "POST",
          body: JSON.stringify({ email: "bobb.verheij@gmail.com", count: 4, dietaryWishes: "" }),
        })
      ).json(),
    );
  };
  return (
    <PageLayout>
      <HomeScreen />
      <button type="button" onClick={handleAddMockGuest}>
        Post
      </button>
    </PageLayout>
  );
};
export default Home;
