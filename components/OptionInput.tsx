import React, { useState, useCallback } from 'react'
import styled, { css } from 'styled-components'
import { selectSelector } from 'redux/slice'
import { useAppSelector } from 'redux/store'
import InputDebounce from 'utils/debounce'

interface InputProps {
  propertyKey: { name: 'titles' | 'width' | 'height'; titleIdx?: number }
  debounce?: boolean
}

function OptionInput({
  propertyKey: { name, titleIdx },
  debounce,
}: InputProps) {
  const {
    option: { titles, width, height },
  } = useAppSelector(selectSelector)

  const [value, setValue] = useState<number | string>('')
  const onChangeDebounce = useCallback(InputDebounce(500), [])
  const onHandleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)

    if (debounce) {
      onChangeDebounce(() => console.log('active after 1s'))
    } else {
      console.log('active immediately')
    }
  }

  //@ base component
  const defaultInput = (attrs: React.InputHTMLAttributes<HTMLInputElement>) => {
    return <Input value={value} onChange={onHandleValue} {...attrs} />
  }

  //@ component return case
  switch (name) {
    case 'width':
      return defaultInput({
        type: 'number',
        placeholder: `가로(현재 크기 ${width}px)`,
      })
    case 'height':
      return defaultInput({
        type: 'number',
        placeholder: `세로(현재 크기 ${height}px)`,
      })
    case 'titles':
      return defaultInput({
        type: 'text',
        placeholder: `${titles[titleIdx as number]}`,
        maxLength: 20,
      })
  }
}

const Input = styled.input`
  padding: 0.7rem 1.5rem;
  width: 80%;
  align-self: flex-start;
  border: 0.2rem solid ${({ theme }) => theme.colors.grayOne};
  border-radius: 0.5rem;

  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.grayZero};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export default OptionInput
