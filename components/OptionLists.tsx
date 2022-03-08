import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { updateOption, selectSelector } from 'redux/slice'
import { useAppDispatch, useAppSelector } from 'redux/store'

interface ListType {
  type: 'showTitle' | 'search' | 'onlyOne' | 'selectedItems'
  children: string
}

const OptionLists = ({ type, children }: ListType) => {
  const dispatch = useAppDispatch()
  const { option } = useAppSelector(selectSelector)
  const [checked, setChecked] = useState(option[type])

  useEffect(() => {
    dispatch(updateOption({ key: type, value: checked }))
  }, [checked])

  return (
    <List>
      <SubTitle>{children}</SubTitle>
      <CheckButton
        onClick={() => {
          setChecked((prev) => !prev)
        }}
      >
        {checked ? '🟢 ' : ' 🔴'}
      </CheckButton>
    </List>
  )
}

const List = styled.li`
  width: 100%;
  border-bottom: solid 0.2rem ${({ theme }) => theme.colors.grayOne};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  &:last-child {
    border-bottom: none;
  }
`
const SubTitle = styled.div`
  font-size: 18px;
`
const CheckButton = styled.button`
  font-size: 18px;
  background-color: transparent;
`
export default OptionLists
