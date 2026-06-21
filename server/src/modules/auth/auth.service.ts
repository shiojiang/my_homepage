import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../../prisma/prisma.service'
import { RegisterDto, LoginDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { username: dto.username }],
      },
    })
    if (existing) {
      throw new ConflictException('用户名或邮箱已存在')
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10)
    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hashedPassword,
      },
    })

    return this.generateToken(user.id, user.username, user.email)
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    })
    if (!user) {
      throw new UnauthorizedException('邮箱或密码错误')
    }

    const isValid = await bcrypt.compare(dto.password, user.password)
    if (!isValid) {
      throw new UnauthorizedException('邮箱或密码错误')
    }

    return this.generateToken(user.id, user.username, user.email)
  }

  private generateToken(userId: string, username: string, email: string) {
    const payload = { sub: userId, username, email }
    return {
      accessToken: this.jwtService.sign(payload),
      user: { id: userId, username, email },
    }
  }
}
