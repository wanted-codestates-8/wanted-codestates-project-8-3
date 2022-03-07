import React, { useState } from 'react'
import styled from 'styled-components'
import { emojiMenus } from 'redux/sample_data'

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [resultList, setResultList] = useState([])

  let searchList: any = []

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let keyword = e.target.value
    if (keyword.length > 0) {
      searchList = emojiMenus.filter((e) => e.name.includes(keyword))
    }
    setSearchKeyword(keyword)
    setResultList(searchList)
  }

  return (
    <SearchWrapper>
      <SearchInput placeholder="search" onChange={onChangeSearch} />
      {resultList.map((item: any) => {
        return (
          <li key={item.id}>
            <span>{item.emoji}</span>
            <span>{item.name}</span>
          </li>
        )
      })}
    </SearchWrapper>
  )
}

export default SearchBar

const SearchWrapper = styled.div`
  margin-top: 20px;
`

const SearchInput = styled.input`
  border-style: none;
  border-radius: 10px;
  background-color: white;
  padding: 16px;
  margin-top: 10px;
  width: 400px;
  height: 54px;
  border: 1px solid rgb(0, 0, 0, 0.2);
  &::placeholder {
    font-size: 21px;
  }
`
