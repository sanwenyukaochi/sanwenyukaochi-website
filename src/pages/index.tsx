import { Link } from 'react-router-dom'
import { BaseHead } from '../components/BaseHead'
import { getSortedPosts } from '../data/posts'

export function HomePage() {
  const latestPosts = getSortedPosts().slice(0, 2)

  return (
    <>
      <BaseHead
        description="The perfect starter for your personal blog and project notes."
        title="Home"
      />
      <section className="home-hero">
        <div className="home-copy">
          <p className="eyebrow">Personal Notes / Frontend / AI</p>
          <h1>欢迎来到 sanwenyukaochi 的博客实验站</h1>
          <p className="hero-text">
            这里会记录我在 React、Next.js、TypeScript、Python 和 AIGC 方向上的学习、
            实验和项目整理。现在这个外层 React 项目已经具备完整 blog 结构。
          </p>
          <div className="hero-actions">
            <Link className="button-link primary" to="/blog">
              浏览文章
            </Link>
            <Link className="button-link" to="/about">
              了解我
            </Link>
          </div>
        </div>

        <figure className="hero-image-block">
          <picture>
            <source srcSet="/assets/home-illustration.webp" media="(min-width: 600px)" />
            <img
              className="hero-image"
              alt="Illustration of person reading a book"
              src="/assets/home-illustration-small.webp"
              width="550"
              height="466"
            />
          </picture>
          <figcaption>
            Illustration by{' '}
            <a href="https://icons8.com/illustrations/author/5c07e68d82bcbc0092519bb6">
              Icons 8
            </a>
          </figcaption>
        </figure>
      </section>

      <section className="home-posts container">
        <div className="section-heading">
          <h2>Latest Posts</h2>
          <Link to="/blog">View all</Link>
        </div>

        <div className="post-grid">
          {latestPosts.map((post) => (
            <article key={post.slug} className="post-card">
              <img src={post.heroImage} alt={post.title} />
              <div className="post-card-body">
                <p className="post-date">{formatDate(post.publishDate)}</p>
                <h3>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
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
