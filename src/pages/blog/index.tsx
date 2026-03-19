import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { BaseHead } from '../../components/BaseHead'
import { getSortedPosts } from '../../data/posts'

export function BlogListPage() {
  // 这里读取并按发布时间倒序拿到所有文章，用于 /blog 列表页展示。
  const allPosts = getSortedPosts()

  return (
    <BlogListContainer className="container">
      <BaseHead description="Latest articles." title="Blog" />
      <h1>Blog</h1>
      {allPosts.map((post, index) => (
        <div key={post.slug}>
          {/* 第一篇文章上方不需要分隔线，后续文章之间再插入。 */}
          {index > 0 ? <hr /> : null}
          <PostListItem>
            <h2>
              {/* 列表页只展示摘要，点击后进入对应 slug 的详情页。 */}
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p>{post.description}</p>
            <PostListFooter>- {formatDate(post.publishDate)}</PostListFooter>
          </PostListItem>
        </div>
      ))}
    </BlogListContainer>
  )
}

function formatDate(date: string) {
  // 把文章 frontmatter 里的日期格式化成列表页更适合阅读的样式。
  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

const BlogListContainer = styled.div`
  > h1 {
    font-size: clamp(3rem, 6vw, 4.4rem);
    line-height: 1.15;
    margin: 0 0 0.6em;
  }

  p {
    font-size: 1.22rem;
    line-height: 1.75;
  }

  @media (max-width: 520px) {
    > h1 {
      font-size: 2.5rem;
    }

    p {
      font-size: 1.08rem;
    }
  }
`

const PostListItem = styled.article`
  h2 {
    margin-bottom: 0.35rem;
    font-family: var(--font-family-sans), serif;
    font-weight: 700;
  }
`

const PostListFooter = styled.div`
  color: var(--text-secondary);
  font-family: var(--font-family-sans), serif;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`
