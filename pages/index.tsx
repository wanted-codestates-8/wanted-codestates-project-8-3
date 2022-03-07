import SearchBar from 'components/SearchBar'
import type { NextPage } from 'next'

import styled from 'styled-components'

const Home: NextPage = () => {
  return (
    <Main>
      <SearchBar />
    </Main>
  )
}

const Main = styled.main`
  min-width: 120rem;
  max-width: 120rem;
  height: 80vh;
  border: solid 1px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
`

export default Home
