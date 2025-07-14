import {Hono} from 'hono'
import {handle} from 'hono/vercel'

import auth from "@/features/auth/server/route"

const app = new Hono().basePath("/api")

// .get("/hello", (c) => {
//     return c.json({hello: 'world'})
// })

// .get("/project/:projectId", (c) => {
//     // 방법 1: 특정 파라미터 가져오기
//     // const projectId = c.req.param("projectId")
    
//     // 방법 2: 구조분해할당으로 가져오기
//     const { projectId } = c.req.param()
    
//     return c.json({ project: projectId })
// })

const routes = app
    .route("/auth", auth);


//export const GET = handle(app)
// 수정: app 대신 routes 사용하래 GPT가 
export const GET = handle(routes)
export const POST = handle(routes)

export type AppType = typeof routes;