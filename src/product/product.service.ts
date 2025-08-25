import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductCodeAlreadyExists, ProductNotFound } from './errors';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    const productExists = await this.prismaService.product.findFirst({
      where: {
        code: createProductDto.code,
      },
    });

    if (productExists) throw new ProductCodeAlreadyExists();

    return this.prismaService.product.create({
      data: createProductDto,
    });
  }

  async findAll() {
    return await this.prismaService.product.findMany();
  }

  async findOne(id: number) {
    const product = await this.prismaService.product.findFirst({
      where: {
        id: id,
      },
    });
    if (!product) throw new ProductNotFound();

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    if (updateProductDto.code) {
      const product = await this.prismaService.product.findFirst({
        where: {
          code: updateProductDto.code,
        },
      });
      if (product && product.id !== id) {
        throw new ProductCodeAlreadyExists();
      }
    }

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
