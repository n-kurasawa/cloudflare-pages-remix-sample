import type { LoaderArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import type { Post } from '~/type'

export const loader = async ({ context }: LoaderArgs) => {
  const { keys } = await context.POSTS_KV.list()

  let posts: Post[] = []
  for (const key of keys) {
    const post = await context.POSTS_KV.get(key.name, { type: 'json' })
    posts.push(post)
  }
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
