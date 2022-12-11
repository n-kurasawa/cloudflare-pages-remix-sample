import type { Post } from '~/type'

interface Env {
  POSTS_KV: KVNamespace
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { keys } = await context.env.POSTS_KV.list()
  let posts: Post[] = []
  for (const key of keys) {
    const post: Post | null = await context.env.POSTS_KV.get(key.name, {
      type: 'json',
    })
    if (post) {
      posts.push(post)
    }
  }
  return new Response(JSON.stringify(posts))
}
