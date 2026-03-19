import { Navigate, Route, Routes } from 'react-router-dom'
import { BaseLayout } from './layouts/BaseLayout'
import { AboutPage } from './pages/about'
import { BlogListPage } from './pages/blog'
import { BlogPostPage } from './pages/blog/[slug]'
import { HomePage } from './pages'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  )
}

export default App
