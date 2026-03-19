import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { Link, Navigate, useParams } from 'react-router-dom'
import { BaseHead } from '../../components/BaseHead'
import { Bio } from '../../components/Bio'
import { getPostBySlug } from '../../data/posts'

export function BlogPostPage() {
  const { slug = '' } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return <Navigate replace to="/blog" />
  }

  return (
    <>
      <BaseHead description={post.description} title={post.title} />
      <header className="post-header">
        <p>
          {formatDate(post.publishDate)} ~ {estimateReadingTime(post.content)}
        </p>
        <h1>{post.title}</h1>
        <hr />
      </header>

      <div className="container">
        <article className="content markdown-body">
          <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>
        <hr />
        <Bio />
        <p className="back-link">
          <Link to="/blog">Back to all posts</Link>
        </p>
      </div>
    </>
  )
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

function estimateReadingTime(content: string) {
  const text = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]*]\([^)]+\)/g, ' ')

  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}
