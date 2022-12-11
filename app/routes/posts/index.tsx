import type { LoaderArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import { getPosts } from '~/models/post.server'

export const loader = async ({ context }: LoaderArgs) => {
  const posts = await getPosts(context)
  return json({ posts })
}

export default function Posts() {
  const { posts } = useLoaderData<typeof loader>()
  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
