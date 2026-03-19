import styled from 'styled-components'

export function Footer() {
  return (
    <FooterShell>
      <span>
        &copy; {new Date().getFullYear()} sanwenyukaochi. Built with React and
        Vite.
      </span>
    </FooterShell>
  )
}

const FooterShell = styled.footer`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  color: var(--text-secondary);
  font-size: 0.82rem;
  text-align: center;

  @media (max-width: 800px) {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
`
