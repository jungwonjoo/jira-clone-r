import {z} from 'zod'

export const loginSchema = z.object({
    email: z.string().trim().min(1, "이메일을 입력해주세요").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "유효한 이메일 형식이 아닙니다"),
    password: z.string().min(8, "비밀번호는 최소 8자리 이상적어주세요")
})