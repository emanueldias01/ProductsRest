import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: 'secret-key',
      signOptions: { expiresIn: 3600 },
    }),
  ],
  exports: [
    AuthService,
    JwtModule,
    AuthGuard,
  ],
})
export class AuthModule {}
