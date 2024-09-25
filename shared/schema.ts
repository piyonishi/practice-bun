import { z } from "zod"

const categorySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(30),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Category name must contain only lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen"
  })
})

const tagSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(30),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Category name must contain only lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen"
  })
})

export const postSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(3).max(100),
  content: z.string().min(10).max(10000),
  // excerpt: z.string().max(200).optional(),
  // author: z.string().min(2).max(50),
  // publishDate: z.coerce.date(),
  // updateDate: z.coerce.date().optional(),
  // category: categorySchema,
  // tags: z.array(tagSchema).min(1).max(5),
  // status: z.enum(["draft", "published", "archived"]),
  // slug: z.string().min(3).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
})
export type Post = z.infer<typeof postSchema>

export const createPostSchema = postSchema.omit({ id: true })
export type createPost = z.infer<typeof createPostSchema>