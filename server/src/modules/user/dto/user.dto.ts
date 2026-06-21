import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator'

export class UpdateUserDto {
  @ApiProperty({ required: false, description: '用户名' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  username?: string

  @ApiProperty({ required: false, description: '头像URL' })
  @IsOptional()
  @IsString()
  avatar?: string

  @ApiProperty({ required: false, description: '个人简介' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  bio?: string

  @ApiProperty({ required: false, description: '所在地' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  location?: string

  @ApiProperty({ required: false, description: '个人网站' })
  @IsOptional()
  @IsString()
  website?: string
}
