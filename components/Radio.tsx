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
  width: 100%;
  border-bottom: solid 0.2rem ${({ theme }) => theme.colors.grayOne};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
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