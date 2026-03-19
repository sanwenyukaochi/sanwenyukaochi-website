import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { Link, Navigate, useParams } from 'react-router-dom'
import { BaseHead } from '../../components/BaseHead'
import { Bio } from '../../components/Bio'
import { CodeBlock } from '../../components/CodeBlock'
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
      <PostHeader>
        <p>
          {formatDate(post.publishDate)} ~ {estimateReadingTime(post.content)}
        </p>
        <h1>{post.title}</h1>
        <hr />
      </PostHeader>

      <PostContainer className="container">
        <PostContent className="content markdown-body">
          {/* 文章正文来自 src/data/blog-posts/*.md，这里把 Markdown 渲染成页面内容。 */}
          <ReactMarkdown
            components={{
              code({ children, className, ...props }) {
                const language = className?.replace('language-', '')
                const code = String(children).replace(/\n$/, '')

                if (!language) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }

                return <CodeBlock code={code} language={language} />
              },
            }}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          >
            {post.content}
          </ReactMarkdown>
        </PostContent>
        <hr />
        <Bio />
        <BackLink>
          <Link to="/blog">Back to all posts</Link>
        </BackLink>
      </PostContainer>
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

const PostHeader = styled.header`
  text-align: center;

  h1 {
    font-size: clamp(3rem, 6vw, 4.4rem);
    line-height: 1.15;
    margin: 0 0 0.5em;
  }

  p {
    color: var(--text-secondary);
    font-family: var(--font-family-sans), serif;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  hr {
    min-width: 100px;
    width: 30%;
  }

  @media (max-width: 520px) {
    h1 {
      font-size: 2.5rem;
    }
  }
`

const PostContainer = styled.div``

const PostContent = styled.article`
  p,
  ul,
  ol {
    font-size: 1.22rem;
    line-height: 1.75;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-family-sans), serif;
    font-weight: 700;
  }

  &.markdown-body h1,
  &.markdown-body h2,
  &.markdown-body h3,
  &.markdown-body h4,
  &.markdown-body h5,
  &.markdown-body h6 {
    line-height: 1.2;
    margin: 1.3em 0 0.5em;
  }

  &.markdown-body h1 {
    font-family: var(--font-family-serif), serif;
    font-size: 3rem;
  }

  &.markdown-body h2 {
    font-size: 1.8rem;
  }

  &.markdown-body h3 {
    font-size: 1.5rem;
  }

  &.markdown-body p a,
  &.markdown-body li a {
    box-shadow: inset 0 -0.12em 0 var(--primary-color);
  }

  &.markdown-body p a:hover,
  &.markdown-body li a:hover {
    color: #fff;
    box-shadow: inset 0 -1.5em 0 var(--primary-color);
  }

  &.markdown-body ul,
  &.markdown-body ol {
    padding-left: 2rem;
  }

  &.markdown-body li {
    margin: 0.8rem 0;
  }

  &.markdown-body blockquote {
    margin: 2rem 0;
    padding: 0 2rem;
    border-left: 4px solid #ccc;
    font-size: 1.35rem;
    font-style: italic;
  }

  &.markdown-body table {
    width: 100%;
    margin: 2rem 0;
    border-collapse: collapse;
    font-family: var(--font-family-sans), serif;
  }

  &.markdown-body th,
  &.markdown-body td {
    padding: 0.65rem 0.8rem;
    border-bottom: 1px solid var(--border-soft);
    text-align: left;
  }

  &.markdown-body code {
    font-family: 'SF Mono', Monaco, Consolas, monospace;
    font-size: calc(1em - 2px);
  }

  &.markdown-body :not(pre) > code {
    padding: 0.18em 0.4em;
    border-radius: 6px;
    background: var(--code-inline-bg);
  }

  &.markdown-body iframe {
    width: 100%;
    border: 0;
    border-radius: 18px;
  }

  @media (max-width: 520px) {
    p,
    ul,
    ol {
      font-size: 1.08rem;
    }
  }
`

const BackLink = styled.p`
  margin-top: 2rem;

  a {
    box-shadow: inset 0 -0.12em 0 var(--primary-color);
  }

  a:hover {
    color: #fff;
    box-shadow: inset 0 -1.5em 0 var(--primary-color);
  }
`
