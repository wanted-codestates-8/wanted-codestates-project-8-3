import styled from 'styled-components'
import {
  BsChevronLeft,
  BsChevronRight,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsArrowCounterclockwise,
} from 'react-icons/bs'
import { useAppDispatch } from 'redux/store'
import { resetItems, moveAllToSelected, moveAllToAvailable } from 'redux/slice'

const Buttons = () => {
  const dispatch = useAppDispatch()

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
            <Button type="button" onClick={() => dispatch(moveAllToSelected())}>
              <BsChevronDoubleRight />
            </Button>
          </ButtonItem>
          <ButtonItem>
            <Button
              type="button"
              onClick={() => dispatch(moveAllToAvailable())}
            >
              <BsChevronDoubleLeft />
            </Button>
          </ButtonItem>
          <ButtonItem>
            <Button className="gray" type="button">
              <BsChevronRight />
            </Button>
          </ButtonItem>
          <ButtonItem>
            <Button className="gray" type="button">
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

  &.gray {
    color: #b2b2b2;
  }

  &:hover {
    background-color: #eee;
  }
`

export default Buttons
