import { useQuery } from '@tanstack/react-query'
import api from '@/services/api'

interface PostDetail {
  id: string
  title: string
  content: string
  summary: string | null
  cover: string | null
  category: string
  tags: string[]
  viewCount: number
  createdAt: string
  updatedAt: string
  author: {
    id: string
    username: string
    avatar: string | null
  }
  _count: {
    comments: number
    likes: number
  }
}

export function usePost(id: string) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => api.get(`/posts/${id}`) as Promise<PostDetail>,
    enabled: !!id,
  })
}
