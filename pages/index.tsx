import OptionLists from 'components/OptionLists'
import type { NextPage } from 'next'
import { Children } from 'react'

import styled from 'styled-components'

const Home: NextPage = () => {
  return (
    <Main>
      nextjs
      <OptionLists>제목</OptionLists>
    </Main>
  )
}

const Main = styled.main`
  min-width: 50rem;
  max-width: 80rem;
  height: 100vh;
  border: solid 1px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
`

export default Home
