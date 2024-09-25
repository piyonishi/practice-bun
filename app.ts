import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { postsRoute } from "./posts"

const app = new Hono()

app.use('*', logger())

app.get('/test', c => {
  return c.json({ message: 'test' })
})

app.route('/api/posts', postsRoute)

export default app