type PostFrontmatter = {
  title: string
  slug: string
  publishDate: string
  description: string
}

export type BlogPost = PostFrontmatter & {
  content: string
  heroImage?: string
}

const markdownModules = import.meta.glob('./blog-posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const posts = Object.entries(markdownModules)
  .map(([, rawFile]) => parseMarkdownPost(rawFile))
  .sort(
    (a, b) => new Date(b.publishDate).valueOf() - new Date(a.publishDate).valueOf(),
  )

export function getSortedPosts() {
  return posts
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug)
}

function parseMarkdownPost(rawFile: string): BlogPost {
  const { frontmatter, content } = splitFrontmatter(rawFile)
  const heroImageMatch = content.match(/!\[[^\]]*]\(([^)]+)\)/)

  return {
    ...frontmatter,
    content: content.trim(),
    heroImage: heroImageMatch?.[1],
  }
}

function splitFrontmatter(rawFile: string): {
  frontmatter: PostFrontmatter
  content: string
} {
  const match = rawFile.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)

  if (!match) {
    throw new Error('Markdown post is missing valid frontmatter.')
  }

  const [, frontmatterBlock, content] = match
  const parsed = Object.fromEntries(
    frontmatterBlock
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const separatorIndex = line.indexOf(':')
        const key = line.slice(0, separatorIndex).trim()
        const value = line.slice(separatorIndex + 1).trim()
        return [key, value]
      }),
  )

  return {
    frontmatter: {
      title: parsed.title ?? '',
      slug: parsed.slug ?? '',
      publishDate: parsed.publishDate ?? '',
      description: parsed.description ?? '',
    },
    content,
  }
}
