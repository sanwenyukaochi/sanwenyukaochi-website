import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { BaseHead } from '../components/BaseHead'
import { getSortedPosts } from '../data/posts'

export function HomePage() {
  const latestPosts = getSortedPosts().slice(0, 3)

  return (
    <>
      <BaseHead
        description="The perfect starter for your personal blog and project notes."
        title="Home"
      />
      <HomeHeroSection>
        <HomeCopy>
          <Eyebrow>Personal Notes / Frontend / AI</Eyebrow>
          <h1>欢迎来到 sanwenyukaochi 的博客实验站</h1>
          <HeroText>
            这里会记录我在 React、Next.js、TypeScript、Python 和 AIGC 方向上的学习、
            实验和项目整理。现在这个外层 React 项目已经具备完整 blog 结构。
          </HeroText>
          <HeroActions>
            <PrimaryButtonLink to="/blog">
              浏览文章
            </PrimaryButtonLink>
            <ButtonLink to="/about">
              了解我
            </ButtonLink>
          </HeroActions>
        </HomeCopy>

        <HeroImageBlock>
          <picture>
            <source srcSet="/assets/home-illustration.webp" media="(min-width: 600px)" />
            <HeroImage
              alt="Illustration of person reading a book"
              src="/assets/home-illustration-small.webp"
              width={550}
              height={466}
            />
          </picture>
          <figcaption>
            Illustration by{' '}
            <a href="https://icons8.com/illustrations/author/5c07e68d82bcbc0092519bb6">
              Icons 8
            </a>
          </figcaption>
        </HeroImageBlock>
      </HomeHeroSection>

      <HomePostsSection className="container">
        <SectionHeading>
          <h2>最新文章</h2>
          <Link to="/blog">查看全部</Link>
        </SectionHeading>

        <PostGrid>
          {latestPosts.map((post) => (
            <PostCard key={post.slug}>
              <PostCardImage src={post.heroImage} alt={post.title} />
              <PostCardBody>
                <PostDate>{formatDate(post.publishDate)}</PostDate>
                <h3>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.description}</p>
              </PostCardBody>
            </PostCard>
          ))}
        </PostGrid>
      </HomePostsSection>
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

const Eyebrow = styled.p`
  font-family: var(--font-family-sans), serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--primary-color-deep);
`

const HomeHeroSection = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
  align-items: center;
  gap: 3rem;
  min-height: 440px;
  margin: 1rem 0 4rem;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`

const HomeCopy = styled.div`
  h1 {
    font-size: clamp(3rem, 6vw, 4.4rem);
    line-height: 1.15;
    margin: 0 0 0.6em;
  }

  @media (max-width: 520px) {
    h1 {
      font-size: 2.5rem;
    }
  }
`

const HeroText = styled.p`
  font-size: 1.22rem;
  line-height: 1.75;

  @media (max-width: 520px) {
    font-size: 1.08rem;
  }
`

const HeroActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 800px) {
    flex-wrap: wrap;
  }
`

const ButtonLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  padding: 0.9rem 1.25rem;
  border: 1px solid var(--border-soft);
  border-radius: 999px;
  background: var(--surface-muted);
  box-shadow: var(--shadow-soft);
  font-family: var(--font-family-sans), serif;
  font-weight: 700;
`

const PrimaryButtonLink = styled(ButtonLink)`
  background: var(--primary-color);
  color: #fff;
  border-color: transparent;

  &:hover {
    color: #fff;
    background: var(--primary-color-deep);
  }
`

const HeroImageBlock = styled.figure`
  margin: 0;
  padding: 1.4rem;
  border: 1px solid rgba(84, 142, 155, 0.16);
  border-radius: 28px;
  background: var(--surface-muted);
  box-shadow: var(--shadow-soft);

  figcaption {
    margin-top: 1rem;
    font-size: 0.85rem;
    color: var(--text-secondary);
    font-style: italic;
  }
`

const HeroImage = styled.img`
  width: 100%;
`

const HomePostsSection = styled.section`
  padding-bottom: 2rem;
`

const SectionHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;

  h2 {
    margin: 0;
    font-family: var(--font-family-sans), serif;
    font-size: 1.8rem;
  }

  a {
    box-shadow: inset 0 -0.12em 0 var(--primary-color);
  }

  a:hover {
    color: #fff;
    box-shadow: inset 0 -1.5em 0 var(--primary-color);
  }
`

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`

const PostCard = styled.article`
  overflow: hidden;
  border: 1px solid rgba(84, 142, 155, 0.14);
  border-radius: 24px;
  background: var(--surface);
  box-shadow: var(--shadow-soft);
`

const PostCardImage = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
`

const PostCardBody = styled.div`
  padding: 1.4rem;

  h3 {
    margin: 0.2rem 0 0.6rem;
    font-family: var(--font-family-sans), serif;
    font-size: 1.35rem;
  }

  p {
    font-size: 1.22rem;
    line-height: 1.75;
  }

  @media (max-width: 520px) {
    p {
      font-size: 1.08rem;
    }
  }
`

const PostDate = styled.p`
  color: var(--text-secondary);
  font-family: var(--font-family-sans), serif;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`
