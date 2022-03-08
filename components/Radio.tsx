import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { updateOption, selectSelector } from 'redux/slice'
import { useAppDispatch, useAppSelector } from 'redux/store'

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
  const dispatch = useAppDispatch()
  const { option } = useAppSelector(selectSelector)

  const [inputStatus, setInputStatus] = useState(option.itemSize)
  const handleClickRadioButton = (radioBtnName: string) => {
    setInputStatus(radioBtnName)
  }

  useEffect(() => {
    dispatch(updateOption({ key: 'itemSize', value: inputStatus }))
  }, [inputStatus, dispatch])

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
