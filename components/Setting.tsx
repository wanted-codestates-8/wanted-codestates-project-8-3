import React, { useState } from 'react'
import styled from 'styled-components'
import { FaCog } from 'react-icons/fa'
import { selectSelector } from 'redux/slice'
import { useAppSelector } from 'redux/store'
import Radio from './Radio'
import OptionLists from './OptionLists'
import OptionInput from './OptionInput'

function Setting() {
  const [showDropdown, setShowDropdown] = useState(true)
  const selector = useAppSelector(selectSelector)

  return (
    <Section>
      <CogButton
        className="flex-center"
        onClick={() => {
          setShowDropdown((prev) => !prev)
        }}
      >
        <FaCog />
      </CogButton>

      {showDropdown && (
        <Dropdown className="flex-center-C">
          <Radio />
          <OptionLists>타이틀</OptionLists>
          <OptionLists>검색</OptionLists>
          <OptionLists>제목</OptionLists>
          <OptionLists>제목</OptionLists>
        </Dropdown>
      )}

    </Section>
  )
}

export const Wrapper = styled.li`
  width: 100%;
  padding: 1rem;
`

const Section = styled.section`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  display: flex;
  flex-direction: column;
`
const CogButton = styled.button`
  font-size: 2rem;
  padding: 1rem;
  background-color: transparent;
  border: 0.2rem solid ${({ theme }) => theme.colors.grayOne};
  border-radius: 1rem;
  cursor: pointer;
  width: fit-content;
  align-self: flex-end;
`

const Dropdown = styled.ul`
  border: 0.2rem solid ${({ theme }) => theme.colors.grayOne};
  border-radius: 1rem;
  width: 30rem;
  margin-top: 1rem;
`

export default Setting
