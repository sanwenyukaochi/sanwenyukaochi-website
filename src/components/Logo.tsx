import { Link } from 'react-router-dom'

export function Logo() {
  return (
    <Link className="site-logo" to="/">
      <img src="/assets/logo.webp" alt="sanwenyukaochi logo" width="48" height="48" />
      <span>sanwenyukaochi</span>
    </Link>
  )
}
