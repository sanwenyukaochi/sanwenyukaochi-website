import { Link } from 'react-router-dom'
import { BaseHead } from '../../components/BaseHead'
import { getSortedPosts } from '../../data/posts'

export function BlogListPage() {
  const allPosts = getSortedPosts()

  return (
    <div className="container">
      <BaseHead description="Latest articles." title="Blog" />
      <h1>Blog</h1>
      {allPosts.map((post, index) => (
        <div key={post.slug}>
          {index > 0 ? <hr /> : null}
          <article className="post-list-item">
            <h2>
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
  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}
