import type { AppLoadContext } from '@remix-run/cloudflare'

type Post = {
  slug: string
  title: string
  markdown: string
}

export async function getPosts(context: AppLoadContext): Promise<Array<Post>> {
  const { keys } = await context.POSTS_KV.list()
  let posts = []
  for (const key of keys) {
    const post = await context.POSTS_KV.get(key.name, { type: 'json' })
    posts.push(post)
  }
  return posts
}

export async function getPost(
  slug: string,
  context: AppLoadContext
): Promise<Post> {
  return await context.POSTS_KV.get(slug, { type: 'json' })
}
