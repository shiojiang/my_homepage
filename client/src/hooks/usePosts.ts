import { useQuery } from '@tanstack/react-query'
import api from '@/services/api'

interface Post {
  id: string
  title: string
  summary: string | null
  cover: string | null
  category: string
  tags: string[]
  createdAt: string
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

interface PostsResponse {
  items: Post[]
  total: number
  page: number
  pageSize: number
}

interface UsePostsParams {
  page?: number
  pageSize?: number
  category?: string
  keyword?: string
}

export function usePosts(params: UsePostsParams = {}) {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () =>
      api.get('/posts', { params }) as Promise<PostsResponse>,
  })
}
