import Buttons from 'components/Buttons'
import type { NextPage } from 'next'
import styled from 'styled-components'
import AvailableOptions from '../components/AvailableOptions'
import SelectedOptions from 'components/SelectedOptions'

const Home: NextPage = () => {
  return (
    <Main>
      <AvailableOptions />
      <Buttons />
      <SelectedOptions />
    </Main>
  )
}

const Main = styled.main`
  display: flex;
  min-width: 120rem;
  max-width: 120rem;
  height: 80vh;
  margin: 0 auto;
`

export default Home
