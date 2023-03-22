import './App.css'
import GlobalStyle from './components/GlobalStyle'
import styled from 'styled-components'
import Router from './shared/Router'
function App() {
  return (
    <>
      <Layout>
        <GlobalStyle />
        <Router />
      </Layout>
    </>
  )
}

export default App
const Layout = styled.main`
  border: 2px solid black;
`
