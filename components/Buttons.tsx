import styled from 'styled-components'
import {
  BsChevronLeft,
  BsChevronRight,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsArrowCounterclockwise,
} from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from 'redux/store'
import {
  resetItems,
  moveAllToSelected,
  moveAllToAvailable,
  moveToSelected,
  moveToAvailable,
} from 'redux/slice'
import { ICheckedIds } from 'pages'

interface IButtons {
  checkedIds: ICheckedIds
  onAvailableChange: (arr: number[]) => void
  onSelectedChange: (arr: number[]) => void
}

const Buttons = ({
  checkedIds,
  onAvailableChange,
  onSelectedChange,
}: IButtons) => {
  const dispatch = useAppDispatch()
  const { available, selected } = useAppSelector(
    (state) => state.selector.items
  )

  return (
    <Container>
      <ButtonBox>
        <ButtonList>
          <ButtonItem>
            <Button type="button" onClick={() => dispatch(resetItems())}>
              <BsArrowCounterclockwise
                style={{ transform: 'rotate(-45deg)', strokeWidth: '1.5' }}
              />
            </Button>
          </ButtonItem>
          <ButtonItem>
            <Button
              disabled={available.length > 0 ? false : true}
              className={available.length > 0 ? 'active' : 'disabled'}
              type="button"
              onClick={() => dispatch(moveAllToSelected())}
            >
              <BsChevronDoubleRight />
            </Button>
          </ButtonItem>
          <ButtonItem>
            <Button
              disabled={selected.length > 0 ? false : true}
              className={selected.length > 0 ? 'active' : 'disabled'}
              type="button"
              onClick={() => dispatch(moveAllToAvailable())}
            >
              <BsChevronDoubleLeft />
            </Button>
          </ButtonItem>
          <ButtonItem>
            <Button
              disabled={checkedIds.available.length > 0 ? false : true}
              className={
                checkedIds.available.length > 0 ? 'active' : 'disabled'
              }
              type="button"
              onClick={() => {
                dispatch(moveToSelected(checkedIds.available))
                onAvailableChange([])
              }}
            >
              <BsChevronRight />
            </Button>
          </ButtonItem>
          <ButtonItem>
            <Button
              disabled={checkedIds.selected.length > 0 ? false : true}
              className={checkedIds.selected.length > 0 ? 'active' : 'disabled'}
              type="button"
              onClick={() => {
                dispatch(moveToAvailable(checkedIds.selected))
                onSelectedChange([])
              }}
            >
              <BsChevronLeft />
            </Button>
          </ButtonItem>
        </ButtonList>
      </ButtonBox>
    </Container>
  )
}

const Container = styled.div`
  margin: auto 10px;
  width: fit-content;
`

const ButtonBox = styled.div`
  border: 1px solid #d8d8d8;
  border-radius: 10px;
  overflow: hidden;
`

const ButtonList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonItem = styled.li`
  & + & {
    border-top: 1px solid #d8d8d8;
  }
`

const Button = styled.button`
  background-color: white;
  color: #414141;
  padding: 10px;
  cursor: pointer;

  &.disabled {
    color: #b2b2b2;
  }

  &.active {
    color: black;
  }

  &:hover {
    background-color: #eee;
  }
`

export default Buttons
