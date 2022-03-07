import type { NextPage } from 'next'
import { Children } from 'react'
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
  display: flex;
  min-width: 120rem;
  max-width: 120rem;
  height: 80vh;
  margin: 0 auto;
  position: relative;
`

export default Home
