import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/user.dto'

@ApiTags('用户')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id/stats')
  @ApiOperation({ summary: '获取用户统计信息' })
  getStats(@Param('id') id: string) {
    return this.userService.getStats(id)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取用户信息' })
  findById(@Param('id') id: string) {
    return this.userService.findById(id)
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新用户信息' })
  update(@Request() req, @Body() dto: UpdateUserDto) {
    return this.userService.update(req.user.userId, dto)
  }
}
