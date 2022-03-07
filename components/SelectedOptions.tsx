import { useState } from 'react'
import styled from 'styled-components'
import { emojiMenus } from '../redux/sample_data'
import SearchBar from './SearchBar'
import Footer from './Footer'

const SelectedOptions = () => {
  const [searchResult, setSearchResult] = useState<typeof emojiMenus>([])
  return (
    <ListWrapper>
        <SearchBar setSearchResult={setSearchResult} />
        <AvailableWrapper>
          <AvailableTitle>selected Options</AvailableTitle>
          {searchResult.length > 0
            ? searchResult.map((el) => {
                return (
                  <SingleList key={el.id}>
                    {el.emoji} &nbsp;&nbsp;&nbsp; {el.name}
                  </SingleList>
                )
              })
            : emojiMenus.map((el) => {
                return (
                  <SingleList key={el.id}>
                    <div>{el.emoji} &nbsp;&nbsp;&nbsp; {el.name}</div>
                  </SingleList>
                )
              })}
        </AvailableWrapper>
      <Footer />
    </ListWrapper>
  )
}

const ListWrapper = styled.div``

const AvailableWrapper = styled.div`
  box-shadow: rgba(70, 53, 53, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  border-radius: 15px;

  min-width: 50rem;
  max-width: 50rem;
  height: 80vh;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  /* align-items: center; */
  overflow: scroll;
`

const AvailableTitle = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  font-family: 'Ubuntu', sans-serif;
  padding: 1.5rem 3.4rem;
  border-bottom: 1px solid lightgray;
`

const SingleList = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 2.5rem;
  border-bottom: 1px solid lightgray;
  /* margin-top: 0.1rem; */

  display: flex;
	text-decoration: none;
	color: inherit;
	position: relative;
	padding: 2.5rem 0 2rem 3.5rem;
	background-color: #FFF;
	cursor: pointer; 
  
  &:before {
		position: absolute; 
		left: 0;
		bottom: 0;
		content: "";
		display: block;
		width: 100%;
		height: 100%;
    background: rgb(255,201,71);
    background: linear-gradient(90deg, rgba(255,201,71,1) 0%, 
      rgba(255,125,74,1) 50%, 
      rgba(254,69,77,1) 100%);
		transform-origin: 0 bottom 0;
		transform: scaleY(0);
		transition: .2s ease-out;
	}
	
	&:hover {
		div {
			color: #FFF;
		}
		&:before {
			transform: scaleY(1);
		}
	}

  div {
    position: relative;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.333;
    transition: .2s ease-out;
  }

`

export default SelectedOptions
