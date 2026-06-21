import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { PostService } from './post.service'
import { CreatePostDto, UpdatePostDto, QueryPostDto } from './dto/post.dto'

@ApiTags('文章')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建文章' })
  create(@Request() req, @Body() dto: CreatePostDto) {
    return this.postService.create(req.user.userId, dto)
  }

  @Get()
  @ApiOperation({ summary: '获取文章列表' })
  findAll(@Query() query: QueryPostDto) {
    return this.postService.findAll(query)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取文章详情' })
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新文章' })
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() dto: UpdatePostDto,
  ) {
    return this.postService.update(id, req.user.userId, dto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除文章' })
  remove(@Param('id') id: string, @Request() req) {
    return this.postService.remove(id, req.user.userId)
  }
}
