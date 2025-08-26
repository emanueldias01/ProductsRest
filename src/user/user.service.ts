import { Injectable, OnModuleInit } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}

  async onModuleInit() {
    this.prismaService.user.deleteMany();
    const userFind = await this.prismaService.user.findFirst({
      where: {
        username: 'admin',
      },
    });
    if (!userFind) {
      await this.prismaService.user.create({
        data: {
          username: 'admin',
          password:
            hashSync("admin", 10),
        },
      });
    }
  }
}
