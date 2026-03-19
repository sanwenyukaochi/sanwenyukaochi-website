import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

export function BaseLayout() {
  return (
    <LayoutShell>
      <Header />
      <MainShell>
        <Outlet />
      </MainShell>
      <Footer />
    </LayoutShell>
  )
}

const LayoutShell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const MainShell = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem 3rem;

  @media (max-width: 800px) {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
`
