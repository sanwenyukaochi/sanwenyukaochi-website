import { Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

export function BaseLayout() {
  return (
    <div className="layout-shell">
      <Header />
      <main className="main-shell">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
