import type { NextPage } from 'next'
import Setting from 'components/Setting'

import styled from 'styled-components'
import Options from 'components/Options'
import Buttons from 'components/Buttons'
import Header from 'components/Header'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useAppDispatch } from 'redux/store'
import { dragAndDrop } from 'redux/slice'

const Home: NextPage = () => {
  const dispatch = useAppDispatch()

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const draggingItemIndex = result.source.index
    const dropItemIndex = result.destination.index

    dispatch(
      dragAndDrop({
        items: result.source.droppableId as 'available' | 'selected',
        from: {
          type: result.source.droppableId as 'available' | 'selected',
          index: draggingItemIndex,
        },
        to: {
          type: result.destination.droppableId as 'available' | 'selected',
          index: dropItemIndex,
        },
      })
    )
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Header />
      <Main>
        <Options type={'available'} />
        <Buttons />
        <Options type={'selected'} />
        {/* <Setting /> */}
      </Main>
    </DragDropContext>
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
