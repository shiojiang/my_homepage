import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './modules/user/user.module'
import { PostModule } from './modules/post/post.module'
import { AuthModule } from './modules/auth/auth.module'
import { UploadModule } from './modules/upload/upload.module'

@Module({
  imports: [PrismaModule, AuthModule, UserModule, PostModule, UploadModule],
})
export class AppModule {}
