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

const markdownModules = import.meta.glob('./blog-posts/*/*/*/*/index.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const assetModules = import.meta.glob('./blog-posts/**/*.{png,jpg,jpeg,webp,gif,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const posts = Object.entries(markdownModules)
  .map(([filePath, rawFile]) => parseMarkdownPost(filePath, rawFile))
  .sort(
    (a, b) =>
      new Date(b.publishDate).valueOf() - new Date(a.publishDate).valueOf(),
  )

export function getSortedPosts() {
  return posts
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug)
}

function parseMarkdownPost(filePath: string, rawFile: string): BlogPost {
  const { frontmatter, content } = splitFrontmatter(rawFile)
  const resolvedContent = resolveRelativeAssets(filePath, content.trim())
  const heroImageMatch = resolvedContent.match(/!\[[^\]]*]\(([^)]+)\)/)

  return {
    ...frontmatter,
    content: resolvedContent,
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

function resolveRelativeAssets(filePath: string, content: string) {
  const directory = filePath.slice(0, filePath.lastIndexOf('/') + 1)

  const replaceAssetPath = (rawPath: string) => {
    if (!rawPath.startsWith('./')) {
      return rawPath
    }

    const assetKey = `${directory}${rawPath.slice(2)}`
    return assetModules[assetKey] ?? rawPath
  }

  return content
    .replace(/\]\((\.\/[^)]+)\)/g, (_, assetPath: string) => `](${replaceAssetPath(assetPath)})`)
    .replace(/src=(['"])(\.\/[^'"]+)\1/g, (_, quote: string, assetPath: string) => {
      return `src=${quote}${replaceAssetPath(assetPath)}${quote}`
    })
}
