import type { NextPage } from "next";

import styled from "styled-components";
import AvailableOptions from "./AvailableOptions";

const Home: NextPage = () => {
  return <Main>
    <AvailableOptions />
  </Main>;
};

const Main = styled.main`
  min-width: 50rem;
  max-width: 50rem;
  height: 80vh;
  /* border: solid 1px rgba(0, 0, 0, 0.2); */
  margin: 0 auto;
`;

export default Home;
