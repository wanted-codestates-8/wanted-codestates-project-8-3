import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { selectSelector, updateOption } from 'redux/slice'
import { useAppSelector, useAppDispatch } from 'redux/store'
import InputDebounce from 'utils/debounce'
import filterString from 'utils/filterString'

interface InputProps {
  propertyKey: { name: 'titles' | 'width' | 'height'; titleIdx?: number }
  debounce?: boolean
  showDropDown: boolean
}

function OptionInput({
  propertyKey: { name, titleIdx },
  debounce,
  showDropDown,
}: InputProps) {
  const {
    option: { titles, width, height },
  } = useAppSelector(selectSelector)

  const dispatch = useAppDispatch()

  const [value, setValue] = useState<number | string>('')
  const onChangeDebounce = useCallback(InputDebounce(300), [])

  const demension = (value: string) => {
    if (filterString(value) || !value) {
      const nextValue = value === '' ? '' : Number(value)
      if (nextValue > 700) {
        setValue(700)
      } else {
        setValue(nextValue)
      }
    }
  }

  const onHandleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'width') {
      demension(e.target.value)
      return
    }

    if (name === 'height') {
      demension(e.target.value)
      return
    }

    setValue(e.target.value)
  }

  useEffect(() => {
    if (value) {
      console.log(value)
      if (debounce) {
        onChangeDebounce(() => {
          dispatch(updateOption({ key: name, value }))
        })
      } else {
        const newValue = [...titles] as [string, string]
        newValue[titleIdx as number] = value as string
        dispatch(updateOption({ key: name, value: newValue }))
      }
    }
  }, [value])

  useEffect(() => {
    !showDropDown && setValue('')
  }, [showDropDown])

  //@ base component
  const defaultInput = (attrs: React.InputHTMLAttributes<HTMLInputElement>) => {
    return <Input value={value} onChange={onHandleValue} {...attrs} />
  }

  //@ component return case
  switch (name) {
    case 'width':
      return defaultInput({
        type: 'text',
        placeholder: `가로(현재 크기 ${width}px, 최소 250px)`,
        maxLength: 3,
      })
    case 'height':
      return defaultInput({
        type: 'text',
        placeholder: `세로(현재 크기 ${height}px, 최소 250px)`,
        maxLength: 3,
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
  width: 100%;
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
