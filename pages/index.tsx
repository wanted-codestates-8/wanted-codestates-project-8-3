import type { NextPage } from 'next'
import Setting from 'components/Setting'

import styled from 'styled-components'
import AvailableOptions from '../components/AvailableOptions'
import SelectedOptions from 'components/SelectedOptions'
import Buttons from 'components/Buttons'
import Header from 'components/Header'

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Main>
        <AvailableOptions />
        <Buttons />
        <SelectedOptions />
        <Setting />
      </Main>
    </>
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
