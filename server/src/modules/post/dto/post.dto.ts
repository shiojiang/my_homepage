import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsInt,
  Min,
  MaxLength,
} from 'class-validator'
import { Type } from 'class-transformer'

export class CreatePostDto {
  @ApiProperty({ description: '标题' })
  @IsString()
  @MaxLength(100)
  title: string

  @ApiProperty({ description: '内容' })
  @IsString()
  content: string

  @ApiProperty({ required: false, description: '摘要' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  summary?: string

  @ApiProperty({ required: false, description: '封面图' })
  @IsOptional()
  @IsString()
  cover?: string

  @ApiProperty({ required: false, description: '分类' })
  @IsOptional()
  @IsString()
  category?: string

  @ApiProperty({ required: false, description: '标签' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[]

  @ApiProperty({ required: false, description: '是否发布', default: false })
  @IsOptional()
  @IsBoolean()
  published?: boolean
}

export class UpdatePostDto {
  @ApiProperty({ required: false, description: '标题' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string

  @ApiProperty({ required: false, description: '内容' })
  @IsOptional()
  @IsString()
  content?: string

  @ApiProperty({ required: false, description: '摘要' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  summary?: string

  @ApiProperty({ required: false, description: '封面图' })
  @IsOptional()
  @IsString()
  cover?: string

  @ApiProperty({ required: false, description: '分类' })
  @IsOptional()
  @IsString()
  category?: string

  @ApiProperty({ required: false, description: '标签' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[]

  @ApiProperty({ required: false, description: '是否发布' })
  @IsOptional()
  @IsBoolean()
  published?: boolean
}

export class QueryPostDto {
  @ApiProperty({ required: false, description: '页码', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number

  @ApiProperty({ required: false, description: '每页数量', default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number

  @ApiProperty({ required: false, description: '分类' })
  @IsOptional()
  @IsString()
  category?: string

  @ApiProperty({ required: false, description: '搜索关键词' })
  @IsOptional()
  @IsString()
  keyword?: string
}
