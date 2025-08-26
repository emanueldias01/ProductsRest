import { Injectable, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductCodeAlreadyExists, ProductNotFound } from './errors';
import { ProductQueryDto } from './dto/product-query-dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
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

  async findAll(dto: ProductQueryDto) {
    const { name, page = 1, size = 15 } = dto;
    return await this.prismaService.product.findMany({
      where: name ? { name: { contains: name } } : {},
      skip: (page - 1) * size,
      take: size,
    });
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
