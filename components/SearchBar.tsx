import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

interface SearchProps {
  setQuery: Dispatch<SetStateAction<string>>
}

const SearchBar = ({ setQuery }: SearchProps) => {
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value.toLowerCase())

  return (
    <SearchWrapper>
      <SearchInput placeholder="search" onChange={onChangeSearch} />
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
