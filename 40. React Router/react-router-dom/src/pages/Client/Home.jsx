import { useOutletContext } from "react-router";

const Home = () => {
  const { test } = useOutletContext();
  console.log("outlet context: ", test);
  return <div>Home</div>;
};

export default Home;
