import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator'

export class RegisterDto {
  @ApiProperty({ description: '用户名', example: 'zhangsan' })
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  username: string

  @ApiProperty({ description: '邮箱', example: 'zhangsan@example.com' })
  @IsEmail()
  email: string

  @ApiProperty({ description: '密码', example: 'password123' })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string
}

export class LoginDto {
  @ApiProperty({ description: '邮箱', example: 'zhangsan@example.com' })
  @IsEmail()
  email: string

  @ApiProperty({ description: '密码', example: 'password123' })
  @IsString()
  password: string
}
