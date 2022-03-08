import type { NextPage } from 'next'
import Setting from 'components/Setting'

import styled from 'styled-components'
import Options from 'components/Options'
import Buttons from 'components/Buttons'
import Header from 'components/Header'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useAppDispatch } from 'redux/store'
import { dragAndDrop } from 'redux/slice'
import { useState } from 'react'

export interface ICheckedIds {
  available: number[]
  selected: number[]
}

const Home: NextPage = () => {
  const dispatch = useAppDispatch()
  const [checkedIds, setCheckedIds] = useState<ICheckedIds>({
    available: [],
    selected: [],
  })

  const onChangeAvailable = (arr: number[]) => {
    setCheckedIds({
      ...checkedIds,
      available: arr,
    })
  }

  const onChangeSelected = (arr: number[]) => {
    setCheckedIds({
      ...checkedIds,
      selected: arr,
    })
  }

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
        <Options
          type={'available'}
          checkedId={checkedIds.available}
          onChangeCheckedId={onChangeAvailable}
        />
        <Buttons
          checkedIds={checkedIds}
          onAvailableChange={onChangeAvailable}
          onSelectedChange={onChangeSelected}
        />
        <Options
          type={'selected'}
          checkedId={checkedIds.selected}
          onChangeCheckedId={onChangeSelected}
        />
        <Setting />
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
