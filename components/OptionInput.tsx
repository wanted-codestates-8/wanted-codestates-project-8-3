import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { selectSelector } from 'redux/slice'
import { useAppSelector } from 'redux/store'

interface InputProps {
  propertyKey: { name: 'titles' | 'width' | 'height'; idx?: number }
  debounce: boolean
}

function OptionInput({ propertyKey: { name, idx }, debounce }: InputProps) {
  const [value, setValue] = useState('')
  const {} = useAppSelector(selectSelector)

  if (name === 'width' || name === 'height') {
    return <InputContainer type="number" placeholder="" />
  } else {
    return <InputContainer type="text" placeholder="" />
  }
}

const InputContainer = styled.input``

export default OptionInput
