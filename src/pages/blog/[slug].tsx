import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { Link, Navigate, useParams } from 'react-router-dom'
import { BaseHead } from '../../components/BaseHead'
import { Bio } from '../../components/Bio'
import { getPostBySlug } from '../../data/posts'

export function BlogPostPage() {
  // 这里从当前路由 /blog/:slug 中取出 slug，用它查找具体文章。
  const { slug = '' } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    // 如果 URL 对应不到文章，就回到博客列表页，避免出现空白详情页。
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
          {/* 文章正文来自 src/data/blog-posts/*.md，这里把 Markdown 渲染成页面内容。 */}
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
  // 详情页顶部的日期展示格式。
  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

function estimateReadingTime(content: string) {
  // 先去掉代码块、HTML 标签和 Markdown 链接标记，再按词数粗略估算阅读时间。
  const text = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]*]\([^)]+\)/g, ' ')

  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}
