import styled from 'styled-components'
import SearchBar from './SearchBar'
import Footer from './Footer'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useAppSelector } from 'redux/store'
import { useState } from 'react'

interface IOptions {
  type: 'available' | 'selected'
}

interface CssProps {
  checkedColor: boolean
  id: any
  selectedId: any
}

const Options = ({ type }: IOptions) => {
  const dataList = useAppSelector((state) => state.selector.items[type])
  const [checkedId, setCheckedId]: any = useState([1])
  const [checkedColor, setCheckedColor] = useState(false)
  const filterId = dataList.filter((item) => checkedId.includes(item.id))
  const selectedId = filterId.map((item) => item.id)

  console.log(selectedId.length, type)

  return (
    <ListWrapper>
      <SearchBar />
      <AvailableWrapper>
        <Availabletype>{type} options</Availabletype>
        <Droppable droppableId={type}>
          {(provided) => (
            <ListBox {...provided.droppableProps} ref={provided.innerRef}>
              {dataList.length > 0 &&
                dataList.map((el, index) => {
                  return (
                    <Draggable
                      key={el.id}
                      draggableId={String(el.id)}
                      index={index}
                    >
                      {(provided) => (
                        <SingleList
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={(event) => {
                            if (event.ctrlKey || event.metaKey) {
                              setCheckedId([...checkedId, el.id])
                              setCheckedColor(!checkedColor)
                            }
                          }}
                          checkedColor={checkedColor}
                          id={el.id}
                          selectedId={selectedId}
                        >
                          <div>
                            {el.emoji} &nbsp;&nbsp;&nbsp; {el.name}
                          </div>
                        </SingleList>
                      )}
                    </Draggable>
                  )
                })}
              ){provided.placeholder}
            </ListBox>
          )}
        </Droppable>
      </AvailableWrapper>
      <Footer total={dataList.length} selectedCount={selectedId.length} />
    </ListWrapper>
  )
}

const ListWrapper = styled.div``

const AvailableWrapper = styled.div`
  box-shadow: rgba(70, 53, 53, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  border-radius: 15px;

  min-width: 50rem;
  max-width: 50rem;
  height: 80vh;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  /* align-items: center; */
  overflow: scroll;
`

const Availabletype = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  font-family: 'Ubuntu', sans-serif;
  padding: 1.5rem 3.4rem;
  border-bottom: 1px solid lightgray;
`

const ListBox = styled.div``

const SingleList = styled.div<CssProps>`
  display: flex;
  flex-direction: row;
  font-size: 2.5rem;
  border-bottom: 1px solid lightgray;
  /* margin-top: 0.1rem; */

  display: flex;
  text-decoration: none;
  color: inherit;
  position: relative;
  padding: 2.5rem 0 2rem 3.5rem;
  background-color: #fff;
  cursor: pointer;

  &:before {
    position: absolute;
    left: 0;
    bottom: 0;
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: rgb(255, 201, 71);
    background: linear-gradient(
      90deg,
      rgba(255, 201, 71, 1) 0%,
      rgba(255, 125, 74, 1) 50%,
      rgba(254, 69, 77, 1) 100%
    );
    transform-origin: 0 bottom 0;
    transform: scaleY(0);
    transition: 0.2s ease-out;
    ${({ selectedId, id }) => {
      return selectedId.includes(id)
        ? 'transform: scaleY(1)'
        : 'transform: scaleY(0)'
    }}
  }

  &:hover {
    div {
      color: #fff;
    }
    &:before {
      transform: scaleY(1);
    }
  }

  div {
    position: relative;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.333;
    transition: 0.2s ease-out;
  }
`

export default Options
