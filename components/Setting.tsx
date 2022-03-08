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
        opened={showDropdown}
        className={`dropdown flex-center${showDropdown ? ' active' : ''}`}
        onClick={() => {
          setShowDropdown((prev) => !prev)
        }}
      >
        <FaCog />
      </CogButton>
      
      <Dropdown className="dropdown flex-center-C" opened={showDropdown}>
        <OptionLists type="showTitle">타이틀</OptionLists>

        {showTitle && (
          <Wrapper className="flex-center-C">
            <OptionInput
              propertyKey={{ name: 'titles', titleIdx: 0 }}
              showDropDown={showDropdown}
            />
            <OptionInput
              propertyKey={{ name: 'titles', titleIdx: 1 }}
              showDropDown={showDropdown}
            />
          </Wrapper>
        )}

        <OptionLists type="search">검색</OptionLists>
        <OptionLists type="onlyOne">하나씩만 옮기기</OptionLists>
        <OptionLists type="selectedItems">선택된 아이탬 개수 표시</OptionLists>
        <Radio />

        <Wrapper className="flex-center-C">
          <OptionInput
            propertyKey={{ name: 'width' }}
            debounce
            showDropDown={showDropdown}
          />
          <OptionInput
            propertyKey={{ name: 'height' }}
            debounce
            showDropDown={showDropdown}
          />
        </Wrapper>
      </Dropdown>
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
const CogButton = styled.button<{ opened: boolean }>`
  font-size: 2rem;
  padding: 1rem;
  background-color: transparent;
  border: 0.2rem solid ${({ theme }) => theme.colors.grayOne};
  border-radius: 1rem;
  cursor: pointer;
  width: fit-content;
  align-self: flex-end;

  background: linear-gradient(#fff, #fff) padding-box,
    linear-gradient(
        90deg,
        rgba(255, 201, 71, 1) 0%,
        rgba(255, 125, 74, 1) 50%,
        rgba(254, 69, 77, 1) 100%
      )
      border-box;
  border-radius: 1rem;
  border: 0.2rem solid transparent;
  color: rgba(255, 125, 74, 1);

  &:hover {
    svg {
      animation: ${({ opened }) =>
        !opened ? 'cogMotion 1.5s ease-in-out infinite' : 'none'};
    }
  width: 30rem;
  margin-top: 1rem;
  background-color: white;
  & > li:last-child {
    border-bottom: none;
  }

  @keyframes cogMotion {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(0.2);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }
`

const Dropdown = styled.ul<{ opened: boolean }>`
  border: 0.2rem solid ${({ theme }) => theme.colors.grayOne};
  border-radius: 1rem;
  width: 30rem;
  margin-top: 1rem;
  background-color: white;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;

  ${({ opened }) =>
    opened &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    `}

  & > li:last-child {
    border-bottom: none;
  }
`

export const Wrapper = styled.li`
  width: 100%;
  padding: 1rem 2rem;
  border-bottom: solid 0.2rem ${({ theme }) => theme.colors.grayOne};
  gap: 0.17rem;
`

export default Setting
