import type { LoaderArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import type { Post } from '~/type'

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url)
  const res = await fetch(`${url.origin}/api/posts`)
  const posts: Post[] = await res.json()
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
