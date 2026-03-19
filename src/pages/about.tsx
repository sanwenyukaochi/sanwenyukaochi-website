import styled from 'styled-components'
import { BaseHead } from '../components/BaseHead'

export function AboutPage() {
  return (
    <AboutContainer className="container">
      <BaseHead
        description="About your blog and the person behind it."
        title="About"
      />
      <h1>About</h1>
      <AboutImage>
        <img
          src="/assets/about-illustration.webp"
          alt="Illustration of a notebook"
          width="330"
        />
        <figcaption>
          Illustration by{' '}
          <a href="https://icons8.com/illustrations/author/5c07e68d82bcbc0092519bb6">
            Icons 8
          </a>
        </figcaption>
      </AboutImage>
      <p>
        我是 sanwenyukaochi，一名喜欢折腾前端、后端和 AI
        工具链的学生开发者。现在主要 在做 React、Next.js、Vite、TypeScript 和
        Python 相关项目，也在继续补后端能力。
      </p>
      <p>
        这个页面沿用了你放在 `tmp/astro-blog-template`
        里的博客风格，但实现方式已经变成 React
        单页应用。后面你只需要继续往文章数据里加内容，就能把这里当成自己的博客主页。
      </p>
      <p>
        如果你要继续扩展，下一步通常是把文章数据从静态数组升级成 Markdown
        文件加载，或者接入 CMS / GitHub 内容源。
      </p>
    </AboutContainer>
  )
}

const AboutContainer = styled.div`
  position: relative;

  h1 {
    font-size: clamp(3rem, 6vw, 4.4rem);
    line-height: 1.15;
    margin: 0 0 0.6em;
  }

  p {
    font-size: 1.22rem;
    line-height: 1.75;
  }

  @media (max-width: 520px) {
    h1 {
      font-size: 2.5rem;
    }

    p {
      font-size: 1.08rem;
    }
  }
`

const AboutImage = styled.figure`
  float: right;
  margin: -2rem -6rem 2rem 2rem;
  max-width: 300px;

  img {
    border-radius: 16px;
  }

  figcaption {
    margin-top: 1rem;
    font-size: 0.85rem;
    color: var(--text-secondary);
    font-style: italic;
  }

  @media (max-width: 1020px) {
    float: none;
    margin: 0 auto 2rem;
  }
`
