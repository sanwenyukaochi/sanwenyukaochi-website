import { Logo } from './Logo'
import { Nav } from './Nav'

export function Header() {
  return (
    <header className="site-header">
      <Logo />
      <Nav />
    </header>
  )
}
