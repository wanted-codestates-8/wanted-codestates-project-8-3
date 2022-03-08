import styled from 'styled-components'
import SearchBar from './SearchBar'
import Footer from './Footer'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useAppSelector } from 'redux/store'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ICheckedIds } from 'pages'

interface IOptions {
  type: 'available' | 'selected'
  checkedId: number[]
  onChangeCheckedId: (arr: number[]) => void
}

interface CssProps {
  id: any
  selectedId: any
}


interface IStartEnd {
  start: number | null
  end: number | null
  direction: 'up' | 'down' | null
}

const Options = ({ type, checkedId, onChangeCheckedId }: IOptions) => {
  const { option } = useAppSelector(selectSelector)
  const dataList = useAppSelector((state) => state.selector.items[type])
  const [query, setQuery] = useState('')
  const filterId = dataList.filter((item) => checkedId.includes(item.id))
  const selectedId = filterId.map((item) => item.id)
  const [startEnd, setStartEnd] = useState<IStartEnd>()

  // shift, ctrl, 단일 클릭 로직
  const onClick = (
    e: React.MouseEvent<HTMLDivElement>,
    id: number,
    index: number
  ) => {
    if (e.shiftKey) {
      let newCheckId: number[]

      // 처음 눌렀을 때

      if (startEnd?.start === null || startEnd?.start === undefined) {
        newCheckId = dataList.slice(0, index + 1).map((data) => data.id)
        onChangeCheckedId(newCheckId)

        setStartEnd({
          start: 0,
          end: index,
          direction: null,
        })
      } else {
        // 시프트로 영역 지정 후 안에 클릭시

        if (checkedId.includes(id)) {
          if (startEnd.direction && startEnd.end !== null) {
            if (startEnd.direction === 'up') {
              // TODO 로직 단순화 가능
              newCheckId = dataList
                .slice(index, startEnd.end + 1)
                .map((data) => data.id)

              const removeCheckId = dataList
                .slice(startEnd.start, startEnd.end + 1)
                .map((data) => data.id)

              onChangeCheckedId([
                ...checkedId.filter(
                  (id: number) => !removeCheckId.includes(id)
                ),
                ...newCheckId,
              ])
            } else {
              newCheckId = dataList
                .slice(startEnd.start, index + 1)
                .map((data) => data.id)

              const removeCheckId = dataList
                .slice(startEnd.start, startEnd.end + 1)
                .map((data) => data.id)

              onChangeCheckedId([
                ...checkedId.filter(
                  (id: number) => !removeCheckId.includes(id)
                ),
                ...newCheckId,
              ])
            }
          }
        } else if (index < startEnd.start) {
          newCheckId = dataList
            .slice(index, startEnd.start + 1)
            .map((data) => data.id)

          if (startEnd.end !== null) {
            const shiftedCheckId = dataList
              .slice(startEnd.start, startEnd.end + 1)
              .map((data) => data.id)

            onChangeCheckedId([
              ...checkedId.filter((id) => !shiftedCheckId.includes(id)),
              ...newCheckId,
            ])
          } else {
            onChangeCheckedId([
              ...checkedId,
              ...newCheckId.slice(1, newCheckId.length + 1),
            ])
          }
          setStartEnd({
            start: index,
            end: startEnd.start,
            direction: 'up',
          })
        } else {
          if (startEnd.end !== null) {
            newCheckId = dataList
              .slice(startEnd.end, index + 1)
              .map((data) => data.id)

            const shiftedCheckId = dataList
              .slice(startEnd.start, startEnd.end + 1)
              .map((data) => data.id)

            onChangeCheckedId([
              ...checkedId.filter((id) => !shiftedCheckId.includes(id)),
              ...newCheckId,
            ])
            setStartEnd({
              start: startEnd.end,
              end: index,
              direction: 'down',
            })
          } else {
            newCheckId = dataList
              .slice(startEnd.start + 1, index + 1)
              .map((data) => data.id)

            onChangeCheckedId([...checkedId, ...newCheckId])
            setStartEnd({
              ...startEnd,
              end: index,
              direction: 'down',
            })
          }
        }
      }
    } else {
      setStartEnd({
        start: index,
        end: null,
        direction: null,
      })
      if (e.ctrlKey || e.metaKey) {
        if (checkedId.includes(id)) {
          onChangeCheckedId(checkedId.filter((v) => v !== id))
        } else {
          onChangeCheckedId([...checkedId, id])
        }
      } else {
        if (checkedId.length === 1 && checkedId[0] === id) {
          onChangeCheckedId([])
        } else {
          onChangeCheckedId([id])
        }
      }
    }
  }

  const showList = () => {
    if (query.length > 0) {
      const filtered = dataList.filter((el) =>
        el.name.toLowerCase().includes(query)
      )
      return filtered.map((el) => {
        return (
          <SingleList key={el.id} id={el.id} selectedId={selectedId}>
            <ListContent className={`${option.itemSize}`}>
                          <span>{el.emoji}</span>
                          <span>{el.name}</span>
                        </ListContent>
          </SingleList>
        )
      })
    } else {
      return dataList.map((el, index) => {
        return (
          <Draggable key={el.id} draggableId={String(el.id)} index={index}>
            {(provided) => (
              <SingleList
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                onClick={(e) => onClick(e, el.id, index)}
                id={el.id}
                selectedId={selectedId}
              >
               <ListContent className={`${option.itemSize}`}>
                          <span>{el.emoji}</span>
                          <span>{el.name}</span>
                        </ListContent>
              </SingleList>
            )}
          </Draggable>
        )
      })
    }
  }

  return (
    <ListWrapper>
      <SearchBar setQuery={setQuery} />
      <AvailableWrapper>
        <Availabletype>{type} options</Availabletype>
        <Droppable droppableId={type}>
          {(provided) => (
            <ListBox {...provided.droppableProps} ref={provided.innerRef}>
              {showList()}
              {provided.placeholder}
            </ListBox>
          )}
        </Droppable>
      </AvailableWrapper>

      {option.selectedItems && (
        <Footer total={dataList.length} selectedCount={selectedId.length} />
      )}
    </ListWrapper>
  )
}

const ListWrapper = styled.div``

const AvailableWrapper = styled.div<{ width: number; height: number }>`
  box-shadow: rgba(70, 53, 53, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  border-radius: 15px;

  min-width: 25rem;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 2rem;
`

const Availabletype = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  font-family: 'Ubuntu', sans-serif;
  padding: 1.5rem 3.4rem;
  border-bottom: 1px solid lightgray;
`

const ListBox = styled.div`
  min-height: 100%;
  overflow: auto;
`

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
      // ctrl + click
      return selectedId.includes(id) ? 'transform: scaleY(1)' : ''
    }};
  }

  &:hover {
    background-color: #eee;
  }

  div {
    position: relative;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.333;
    transition: 0.2s ease-out;
  }
`

const ListContent = styled.div`
  & span:first-child {
    margin-right: 1.5rem;
  }

  &.XS span {
    font-size: 1.5rem;
  }

  &.S span {
    font-size: 2rem;
  }

  &.M span {
    font-size: 2.5rem;
  }
`

export default Options
