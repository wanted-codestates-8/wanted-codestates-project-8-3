import type { AppProps } from 'next/app'
import { store } from 'redux/store'
import { ThemeProvider } from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html {
        font-size: 62.5%;
        scroll-behavior: smooth;
        overflow-x: hidden;
    }
    
    body {
        font-size: 1.6rem;
        font-family: 'Inter', 'sans-serif';
        user-select: none;
        -webkit-user-select: none; 
        -moz-user-select: none;   
        -ms-user-select: none;     
        -o-user-select: none;
    }
    
    a {
        text-decoration: none;
        color:black;
    }
    ul {
        list-style-type: none;
    }
    img{
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    button{
      border:none;
      cursor:pointer;
      
      &:focus{
        outline:none;
      }
    }
    input {
      outline:none;
      padding: 0 1.5rem;
      &:focus::placeholder{
        color:transparent;
      }
    }
    .flex-center {
      display:flex;
      align-items:center;
      justify-content: center;
    }
    .flex-center-C {
      display:flex;
      align-items:center;
      justify-content: center;
      flex-direction:column;
    }
  `

const persistor = persistStore(store)

function MyApp({ Component, pageProps }: AppProps) {
  const theme = {
    colors: {
      //@ common style
      mainColor: '#FF6363',
      pointColor: '',
      lightblue: '#C5E2EE',
      starColor: '#fd4',
      grayZero: '#d2d2d2',
      grayOne: '#d5d5d5',
      blackOne: '#1c1c1c',
      blackTwo: '#111',
    },
  }

  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyles />
          <Component {...pageProps} />
        </PersistGate>
      </ThemeProvider>
    </ReduxProvider>
  )
}
export default MyApp
