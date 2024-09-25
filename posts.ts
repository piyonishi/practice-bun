import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { createPostSchema } from './shared/schema'
import type { Post } from './shared/schema'

export const fakePosts: Post[] = [
  {
    id: 1,
    title: "Getting Started with TypeScript",
    content: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. In this post, we'll explore the basics of TypeScript and how it can improve your development workflow.",
    // excerpt: "Learn the basics of TypeScript and how it can enhance your JavaScript development.",
    // author: "Alice Johnson",
    // publishDate: new Date("2023-01-15T10:00:00Z"),
    // updateDate: new Date("2023-01-16T14:30:00Z"),
    // category: { id: 1, name: "programming", slug: "programming" },
    // tags: [
    //   { id: 1, name: "typescript", slug: "typescript" },
    //   { id: 2, name: "javascript", slug: "javascript" },
    //   { id: 3, name: "web-development", slug: "web-development" }
    // ],
    // status: "published",
    // slug: "getting-started-with-typescript"
  },
  {
    id: 2,
    title: "10 Essential React Hooks",
    content: "React Hooks have revolutionized the way we write React components. In this comprehensive guide, we'll cover 10 essential React Hooks that every developer should know.",
    // excerpt: "Discover 10 crucial React Hooks to level up your React development skills.",
    // author: "Bob Smith",
    // publishDate: new Date("2023-02-22T09:15:00Z"),
    // category: { id: 2, name: "react", slug: "react" },
    // tags: [
    //   { id: 4, name: "react", slug: "react" },
    //   { id: 5, name: "hooks", slug: "hooks" },
    //   { id: 6, name: "frontend", slug: "frontend" }
    // ],
    // status: "published",
    // slug: "10-essential-react-hooks"
  },
  {
    id: 3,
    title: "Introduction to GraphQL",
    content: "GraphQL is a query language for APIs and a runtime for executing those queries with your existing data. This post will introduce you to the core concepts of GraphQL.",
    // excerpt: "Get started with GraphQL and learn how it can improve your API development.",
    // author: "Charlie Brown",
    // publishDate: new Date("2023-03-10T11:30:00Z"),
    // category: { id: 3, name: "api-development", slug: "api-development" },
    // tags: [
    //   { id: 7, name: "graphql", slug: "graphql" },
    //   { id: 8, name: "api", slug: "api" },
    //   { id: 9, name: "backend", slug: "backend" }
    // ],
    // status: "draft",
    // slug: "introduction-to-graphql"
  }
]

export const postsRoute = new Hono()
  .get('/', (c) => {
    return c.json({ posts: fakePosts })
  })
  .post('/', zValidator("json", createPostSchema), async (c) => {
    const post = await c.req.valid("json")
    fakePosts.push({...post, id: fakePosts.length + 1})
    c.status(201)
    return c.json(post)
  })
  .get('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param("id"))
    const post = fakePosts.find(post => post.id === id)
    if (!post) {
      return c.notFound()
    }
    return c.json({ post })
  })
  .delete('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param("id"))
    const index = fakePosts.findIndex(post => post.id === id)
    if (index === -1) {
      return c.notFound()
    }
    const deletedPost = fakePosts.splice(index, 1)[0]
    return c.json({ post: deletedPost })
  })
  // .put