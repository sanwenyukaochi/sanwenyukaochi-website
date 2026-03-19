// BlogPost 描述“渲染一篇文章”最终需要的完整数据结构。
export type BlogPost = {
  title: string // 文章标题
  slug: string // URL 用的唯一标识，例如 /blog/hello-world
  publishDate: string // 发布日期，后面会拿它排序
  description: string // 列表页展示的摘要描述
  content: string // 已经处理好图片路径的 Markdown 正文
  heroImage?: string // 从正文第一张图里提取出来的封面图
}

// 扫描所有文章 Markdown：
// 这里约定文章目录结构必须是 年/月/日/标题/index.md。
const markdownModules = import.meta.glob('./blog-posts/*/*/*/*/index.md', {
  query: '?raw', // 以原始字符串形式读取 Markdown 文件
  import: 'default', // 取默认导出内容
  eager: true, // 启动时直接全部加载，不做懒加载
}) as Record<string, string>

// 扫描文章目录下所有可能被 Markdown 引用到的图片资源。
const assetModules = import.meta.glob(
  './blog-posts/**/*.{png,jpg,jpeg,webp,gif,svg}',
  {
    eager: true, // 同样直接全部加载，后面方便按路径查表
    import: 'default', // 取资源最终打包后的 URL
  },
) as Record<string, string>

// posts 是整个博客的数据源：
// 先把每个 Markdown 解析成 BlogPost，再按发布日期倒序排好。
const posts = Object.entries(markdownModules)
  .map(([filePath, rawMarkdown]) => parsePost(filePath, rawMarkdown)) // 把文件内容转换成文章对象
  .sort(
    (a, b) =>
      new Date(b.publishDate).valueOf() - new Date(a.publishDate).valueOf(), // 新文章排前面
  )

export function getSortedPosts() {
  return posts // 列表页 / 首页直接复用这份排好序的数据
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug) // 详情页通过 slug 找到对应文章
}

function parsePost(filePath: string, rawMarkdown: string): BlogPost {
  // 用正则把 Markdown 文件拆成两段：
  // 1. --- 包起来的文章头信息
  // 2. 正文内容
  const [, metaBlock, markdownBody] =
    rawMarkdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/) ?? []

  // 把文章头信息里的每一行 key: value 转成对象。
  const meta = Object.fromEntries(
    metaBlock.split('\n').map((line) => {
      const [key, ...rest] = line.split(':') // 第一个冒号左边当 key，右边全部拼回 value
      return [key.trim(), rest.join(':').trim()] // 去掉多余空格，避免头信息格式不整齐
    }),
  ) as Omit<BlogPost, 'content' | 'heroImage'>

  // 取出当前文章所在目录，后面把 ./title.webp 这种相对路径转成真实资源地址时会用到。
  const directory = filePath.slice(0, filePath.lastIndexOf('/') + 1)

  // 把正文里形如 ](./title.webp) 的相对资源路径，替换成 Vite 打包后的真实 URL。
  const content = markdownBody.trim().replace(
    /]\((\.\/[^)]+)\)/g,
    (_, assetPath: string) => {
      const assetKey = `${directory}${assetPath.slice(2)}` // 拼出 import.meta.glob 扫描时使用的完整 key
      const assetUrl = assetModules[assetKey] // 去资源表里找到真正的图片地址
      return `](${assetUrl})` // 用真实地址替换原来的 ./相对路径
    },
  )

  return {
    title: meta.title, // 文章标题
    slug: meta.slug, // 文章 slug
    publishDate: meta.publishDate, // 发布日期
    description: meta.description, // 摘要描述
    content, // 已经替换好图片路径的正文
    heroImage: content.match(/!\[[^\]]*]\(([^)]+)\)/)?.[1], // 取正文第一张 Markdown 图片当封面
  }
}
