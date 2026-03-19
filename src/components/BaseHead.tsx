import { useEffect } from 'react'

type BaseHeadProps = {
  title: string
  description: string
  permalink?: string
}

const siteName = 'sanwenyukaochi'
const defaultImage = '/assets/social.png'

export function BaseHead({ title, description, permalink }: BaseHeadProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${siteName}`
    const url = permalink ?? window.location.href
    const imageUrl = new URL(defaultImage, window.location.origin).toString()

    document.title = fullTitle
    updateMeta('name', 'title', fullTitle)
    updateMeta('name', 'description', description)
    updateMeta('property', 'og:type', 'website')
    updateMeta('property', 'og:url', url)
    updateMeta('property', 'og:title', fullTitle)
    updateMeta('property', 'og:description', description)
    updateMeta('property', 'og:image', imageUrl)
    updateMeta('property', 'twitter:card', 'summary_large_image')
    updateMeta('property', 'twitter:url', url)
    updateMeta('property', 'twitter:title', fullTitle)
    updateMeta('property', 'twitter:description', description)
    updateMeta('property', 'twitter:image', imageUrl)
    updateLink('icon', '/vite.svg')
    updateLink('canonical', url)
  }, [description, permalink, title])

  return null
}

function updateMeta(kind: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${kind}="${key}"]`,
  )

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(kind, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function updateLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"]`,
  )

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}
