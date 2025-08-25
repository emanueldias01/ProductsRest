import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({
      data: createProductDto,
    });
  }

  async findAll() {
    return await this.prismaService.product.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.product.findFirst({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({
      where: {
        id: id,
      },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    await this.prismaService.product.delete({
      where: {
        id: id,
      },
    });
  }
}
