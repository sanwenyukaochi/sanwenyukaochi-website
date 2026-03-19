import { NavLink } from 'react-router-dom'
import { ThemeToggleButton } from './ThemeToggleButton'

const navItems = [
  { to: '/', label: 'home', end: true },
  { to: '/about', label: 'about' },
  { to: '/blog', label: 'blog' },
]

export function Nav() {
  return (
    <nav className="site-nav" aria-label="主导航">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          className={({ isActive }) => `site-nav-link${isActive ? ' selected' : ''}`}
          end={item.end}
          to={item.to}
        >
          {item.label}
        </NavLink>
      ))}
      <div className="theme-toggle-container">
        <ThemeToggleButton />
      </div>
    </nav>
  )
}
