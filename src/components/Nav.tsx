import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { ThemeToggleButton } from './ThemeToggleButton'

const navItems = [
  { to: '/', label: 'home', end: true },
  { to: '/about', label: 'about' },
  { to: '/blog', label: 'blog' },
]

export function Nav() {
  return (
    <NavShell aria-label="主导航">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          className={({ isActive }) =>
            `site-nav-link${isActive ? ' selected' : ''}`
          }
          end={item.end}
          to={item.to}
        >
          {item.label}
        </NavLink>
      ))}
      <ThemeToggleContainer>
        <ThemeToggleButton />
      </ThemeToggleContainer>
    </NavShell>
  )
}

const NavShell = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.25rem;
  font-family: var(--font-family-sans), serif;
  font-weight: 700;
  text-transform: uppercase;

  .site-nav-link {
    position: relative;
    display: block;
    padding: 0.6rem 0.15rem;
    opacity: 0.72;
  }

  .site-nav-link::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: var(--text-secondary);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.25s ease;
  }

  .site-nav-link:hover::before,
  .site-nav-link.selected::before {
    transform: scaleX(1);
  }

  .site-nav-link.selected {
    opacity: 1;
  }

  .site-nav-link.selected::before {
    background: var(--primary-color);
  }

  @media (max-width: 800px) {
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
`

const ThemeToggleContainer = styled.div`
  width: 75px;
  margin-left: 0.35rem;

  @media (max-width: 800px) {
    margin-left: 0;
  }
`
