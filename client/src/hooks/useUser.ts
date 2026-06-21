import { useQuery } from '@tanstack/react-query'
import api from '@/services/api'

interface User {
  id: string
  username: string
  email: string
  avatar: string | null
  bio: string | null
  location: string | null
  website: string | null
  createdAt: string
  _count: {
    posts: number
    comments: number
  }
}

// 获取当前用户（开发阶段返回首个用户）
export function useUser() {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => api.get('/users/me') as Promise<User>,
  })
}
