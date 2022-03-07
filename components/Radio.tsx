import React, { useState } from 'react'
import styled from 'styled-components'

export default function Radio() {
  const itemSize = [
    {
      id: '1',
      value: 'XS',
    },
    {
      id: '2',
      value: 'S',
    },
    {
      id: '3',
      value: 'M',
    },
  ]

  const [inputStatus, setInputStatus] = useState('')
  const handleClickRadioButton = (radioBtnName: string) => {
    setInputStatus(radioBtnName)
    console.log(inputStatus)
  }
  return (
    <RadioWrap>
      <Span>아이템 크기</Span>
      {itemSize.map((v) => (
        <div key={v.id}>
          <Input
            type="radio"
            id={v.value}
            checked={inputStatus === v.value}
            onChange={() => handleClickRadioButton(v.value)}
          />
          <Label htmlFor={v.value}>{v.value}</Label>
        </div>
      ))}
    </RadioWrap>
  )
}

const RadioWrap = styled.li`
  display: flex;
  width: 100%;
  padding: 1rem;
  border: 0.2rem solid ${({ theme }) => theme.colors.grayOne};
`

const Span = styled.span`
  margin-right: 5px;
`
const Input = styled.input`
  margin-right: 5px;
`

const Label = styled.label`
  margin-right: 5px;
`
