import React, { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import { emojiMenus } from 'redux/sample_data'

interface SearchProps {
  setSearchResult: Dispatch<SetStateAction<typeof emojiMenus>>
}

const SearchBar = ({ setSearchResult }: SearchProps) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [resultList, setResultList] = useState<typeof emojiMenus>([])

  let searchList: typeof emojiMenus = []

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let keyword = e.target.value
    if (keyword.length > 0) {
      searchList = emojiMenus.filter((e) => e.name.includes(keyword))
    }
    setSearchKeyword(keyword)
    setSearchResult(searchList)
  }

  return (
    <SearchWrapper>
      <SearchInput placeholder="search" onChange={onChangeSearch} />
      {resultList.map((item) => {
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
  padding: 0 0 2rem 0;
`

const SearchInput = styled.input`
  border-style: none;
  border-radius: 10px;
  background-color: white;
  padding: 16px;
  margin-top: 10px;
  width: 500px;
  height: 54px;
  border: 1px solid rgb(0, 0, 0, 0.2);
  &::placeholder {
    font-size: 21px;
  }
`
