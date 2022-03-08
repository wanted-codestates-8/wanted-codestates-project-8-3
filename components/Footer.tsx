import styled from 'styled-components'

interface IFooter {
  total: number
  selectedCount: number
}

const Footer = ({ total, selectedCount }: IFooter) => {
  return (
    <>
      <SelectedListNum>
        {selectedCount} / {total}
      </SelectedListNum>
    </>
  )
}

const SelectedListNum = styled.div`
  font-size: 2.5rem;
  text-align: center;
  padding: 1.5rem;

  box-shadow: rgba(70, 53, 53, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  border-radius: 1rem;
  margin-bottom: 2rem;
`

export default Footer
