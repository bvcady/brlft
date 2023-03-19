import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

  return <HomeScreen />;
};
export default Home;
//  {
//    /* <button type="button" onClick={handleAddMockGuest}>
//       Post
//     </button> */
//  }
