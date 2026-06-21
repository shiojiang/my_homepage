import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { diskStorage } from 'multer'
import { extname, join } from 'path'
import { v4 as uuidv4 } from 'uuid'

// 简易 uuid 实现，避免额外依赖
function simpleUuid(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '上传文件' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads'),
        filename: (_req, file, cb) => {
          const filename = `${simpleUuid()}${extname(file.originalname)}`
          cb(null, filename)
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `/uploads/${file.filename}`,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    }
  }
}
