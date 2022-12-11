import type { LoaderArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { marked } from 'marked'
import invariant from 'tiny-invariant'

import { getPost } from '~/models/post.server'

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, `params.slug is required`)

  const post = await getPost(params.slug)
  invariant(post, `Post not found: ${params.slug}`)

  const html = marked(post.markdown)
  return json({ post, html })
}

export default function PostSlug() {
  const { post, html } = useLoaderData<typeof loader>()
  return (
    <main>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  )
}
