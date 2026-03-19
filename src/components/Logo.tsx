import styled from 'styled-components'
import { Link } from 'react-router-dom'

export function Logo() {
  return (
    <LogoLink to="/">
      <LogoImage src="/assets/logo.webp" alt="sanwenyukaochi logo" width={75} />
      <span>sanwenyukaochi</span>
    </LogoLink>
  )
}

const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  font-family: var(--font-family-sans), serif;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`

const LogoImage = styled.img`
  display: block;
  width: 75px;
  height: auto;

  @media (max-width: 520px) {
    display: none;
  }
`
