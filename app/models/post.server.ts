import type { AppLoadContext } from '@remix-run/cloudflare'

type Post = {
  slug: string
  title: string
  markdown: string
}

export async function getPosts(context: AppLoadContext): Promise<Array<Post>> {
  return await context.POSTS_KV.list()
}

export async function getPost(
  slug: string,
  context: AppLoadContext
): Promise<Post> {
  return await context.POSTS_KV.get(slug, { type: 'json' })
}
