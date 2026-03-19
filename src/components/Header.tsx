import styled from 'styled-components'
import { Logo } from './Logo'
import { Nav } from './Nav'

export function Header() {
  return (
    <HeaderShell>
      <Logo />
      <Nav />
    </HeaderShell>
  )
}

const HeaderShell = styled.header`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 800px) {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 520px) {
    gap: 1.25rem;
    padding-top: 1.5rem;
    padding-bottom: 1rem;
  }
`
