import type { NextPage } from 'next'
import Setting from 'components/Setting'

import styled from 'styled-components'

const Home: NextPage = () => {
  return (
    <Main>
      nextjs
      <Setting />
    </Main>
  )
}

const Main = styled.main`
  min-width: 50rem;
  max-width: 80rem;
  height: 100vh;
  border: solid 1px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  position: relative;
`

export default Home
