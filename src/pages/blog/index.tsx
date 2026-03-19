import { Link } from 'react-router-dom'
import { BaseHead } from '../../components/BaseHead'
import { getSortedPosts } from '../../data/posts'

export function BlogListPage() {
  // 这里读取并按发布时间倒序拿到所有文章，用于 /blog 列表页展示。
  const allPosts = getSortedPosts()

  return (
    <div className="container">
      <BaseHead description="Latest articles." title="Blog" />
      <h1>Blog</h1>
      {allPosts.map((post, index) => (
        <div key={post.slug}>
          {/* 第一篇文章上方不需要分隔线，后续文章之间再插入。 */}
          {index > 0 ? <hr /> : null}
          <article className="post-list-item">
            <h2>
              {/* 列表页只展示摘要，点击后进入对应 slug 的详情页。 */}
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p>{post.description}</p>
            <div className="post-list-footer">
              <span className="post-date">- {formatDate(post.publishDate)}</span>
            </div>
          </article>
        </div>
      ))}
    </div>
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
