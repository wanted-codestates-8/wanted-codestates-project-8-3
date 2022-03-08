import styled from 'styled-components'
import Image from 'next/image'
import logo from '../public/logo-default.svg'
import Setting from 'components/Setting'

const Header = () => {
  return (
    <ImageWrapper>
      <Image alt="logo" src={logo} width={'1000px'} height={'100px'} />
      <Setting />
    </ImageWrapper>
  )
}

const ImageWrapper = styled.div`
  text-align: center;
  padding: 2rem 0 0 0;
  margin-bottom: 2rem;
  position: relative;
`

export default Header
