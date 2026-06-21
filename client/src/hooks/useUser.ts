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

export function useUser(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => api.get(`/users/${userId}`) as Promise<User>,
    enabled: !!userId,
  })
}
