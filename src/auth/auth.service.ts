import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { compareSync, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService, private jwtService: JwtService) {}
  async authenticate(dto: AuthDto) {
    const userFind = await this.prismaService.user.findFirst({
      where: {
        username: dto.username,
      },
    });

    if (!userFind || !compareSync(dto.password, userFind.password)) {
        console.log(userFind);
      throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);
    }
    
    const payload = {
        sub: userFind.username,
        role: userFind.role
    }

    return {
        acess_tooken: this.jwtService.sign(payload)
    }
  }
}
