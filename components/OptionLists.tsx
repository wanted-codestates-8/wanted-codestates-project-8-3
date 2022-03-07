import { useState } from 'react'
import styled from 'styled-components'

interface ListType {
  children: string
}

const OptionLists = ({ children }: ListType) => {
  const [checked, setChecked] = useState(true)

  return (
    <List>
      <SubTitle>{children}</SubTitle>
      <CheckButton onClick={() => setChecked((prev) => !prev)}>
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
`
const SubTitle = styled.div`
  font-size: 18px;
`
const CheckButton = styled.button`
  font-size: 18px;
  background-color: transparent;
`
export default OptionLists
