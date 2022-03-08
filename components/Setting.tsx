import React, { useState, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { FaCog } from 'react-icons/fa'
import { selectSelector } from 'redux/slice'
import { useAppSelector } from 'redux/store'
import Radio from './Radio'
import OptionLists from './OptionLists'
import OptionInput from './OptionInput'

function Setting() {
  const [showDropdown, setShowDropdown] = useState(false)
  const {
    option: { showTitle },
  } = useAppSelector(selectSelector)

  useEffect(() => {
    function clickOutside(e: MouseEvent) {
      const target = e.target as Element

      if (!target.closest('.dropdown')) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('click', clickOutside)

    return () => document.removeEventListener('click', clickOutside)
  }, [])

  return (
    <Section>
      <CogButton
        className="dropdown flex-center"
        onClick={() => {
          setShowDropdown((prev) => !prev)
        }}
      >
        <FaCog />
      </CogButton>

      {showDropdown && (
        <Dropdown className="dropdown flex-center-C">
          <OptionLists type="showTitle">타이틀</OptionLists>
          {showTitle && (
            <Wrapper className="flex-center-C">
              <OptionInput propertyKey={{ name: 'titles', titleIdx: 0 }} />
              <OptionInput propertyKey={{ name: 'titles', titleIdx: 1 }} />
            </Wrapper>
          )}

          <OptionLists type="search">검색</OptionLists>
          <OptionLists type="onlyOne">하나씩만 옮기기</OptionLists>
          <OptionLists type="selectedItems">
            선택된 아이탬 개수 표시
          </OptionLists>
          <Radio />

          <Wrapper className="flex-center-C">
            <OptionInput propertyKey={{ name: 'width' }} debounce />
            <OptionInput propertyKey={{ name: 'height' }} debounce />
          </Wrapper>
        </Dropdown>
      )}
    </Section>
  )
}

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
  background-color: white;
  & > li:last-child {
    border-bottom: none;
  }
`

const rotateZ = css`
  @keyframes rotateZ {
    0% {
      opcity: 0;
      transform: translateZ(290px);
    }
    80% {
      transform: translateZ(10px);
    }
    100% {
      opacity: 1;
      trnasform: translateZ(0);
    }
  }
`

export const Wrapper = styled.li`
  width: 100%;
  padding: 1rem 2rem;
  border-bottom: solid 0.2rem ${({ theme }) => theme.colors.grayOne};
  gap: 0.17rem;
`

export default Setting
