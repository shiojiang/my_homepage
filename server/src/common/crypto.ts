import { randomBytes, createHash } from 'crypto'

// bcrypt 纯 JS 替代方案（本地开发用，生产环境建议替换为 bcrypt）
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex')
  const hash = createHash('sha256').update(password + salt).digest('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, hashed: string): boolean {
  const [salt, hash] = hashed.split(':')
  if (!salt || !hash) return false
  return createHash('sha256').update(password + salt).digest('hex') === hash
}
