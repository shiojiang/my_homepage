import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { UpdateUserDto } from './dto/user.dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        bio: true,
        location: true,
        website: true,
        createdAt: true,
        _count: {
          select: { posts: true, comments: true },
        },
      },
    })
    if (!user) throw new NotFoundException('用户不存在')
    return user
  }

  async update(id: string, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: dto,
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        bio: true,
        location: true,
        website: true,
      },
    })
  }

  async getStats(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        _count: {
          select: { posts: true, comments: true },
        },
      },
    })
    if (!user) throw new NotFoundException('用户不存在')

    // 收集所有标签去重
    const posts = await this.prisma.post.findMany({
      where: { authorId: id, published: true },
      select: { tags: true },
    })
    const uniqueTags = new Set(posts.flatMap((p) => p.tags))

    return {
      posts: user._count.posts,
      comments: user._count.comments,
      tags: uniqueTags.size,
      links: 0,
    }
  }
}
