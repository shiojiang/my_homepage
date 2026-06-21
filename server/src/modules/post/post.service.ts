import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreatePostDto, UpdatePostDto, QueryPostDto } from './dto/post.dto'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(authorId: string, dto: CreatePostDto) {
    return this.prisma.post.create({
      data: { ...dto, authorId },
      include: {
        author: {
          select: { id: true, username: true, avatar: true },
        },
      },
    })
  }

  async findAll(query: QueryPostDto) {
    const { page = 1, pageSize = 10, category, keyword } = query
    const skip = (page - 1) * pageSize

    const where: any = { published: true }
    if (category) where.category = category
    if (keyword) {
      where.OR = [
        { title: { contains: keyword } },
        { content: { contains: keyword } },
      ]
    }

    const [items, total] = await Promise.all([
      this.prisma.post.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: { id: true, username: true, avatar: true },
          },
          _count: {
            select: { comments: true, likes: true },
          },
        },
      }),
      this.prisma.post.count({ where }),
    ])

    return { items, total, page, pageSize }
  }

  async findOne(id: string) {
    const post = await this.prisma.post.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
      include: {
        author: {
          select: { id: true, username: true, avatar: true },
        },
        _count: {
          select: { comments: true, likes: true },
        },
      },
    })
    if (!post) throw new NotFoundException('文章不存在')
    return post
  }

  async update(id: string, authorId: string, dto: UpdatePostDto) {
    const post = await this.prisma.post.findFirst({
      where: { id, authorId },
    })
    if (!post) throw new NotFoundException('文章不存在')

    return this.prisma.post.update({
      where: { id },
      data: dto,
    })
  }

  async remove(id: string, authorId: string) {
    const post = await this.prisma.post.findFirst({
      where: { id, authorId },
    })
    if (!post) throw new NotFoundException('文章不存在')

    await this.prisma.post.delete({ where: { id } })
    return { message: '删除成功' }
  }
}
