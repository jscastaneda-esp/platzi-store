import { Injectable, NotFoundException } from '@nestjs/common'
import { Product } from '@/products/entities/product.entity'
import {
  CreateProductDTO,
  UpdateProductDTO,
} from '@/products/dtos/products.dto'

@Injectable()
export class ProductsService {
  private sequenceId = 1
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description:
        'Laboris commodo consequat et fugiat sunt sit culpa cillum cillum ut velit dolore minim officia.',
      price: 122,
      stock: 10,
      image: 'https://img.png',
    },
  ]

  create(product: CreateProductDTO) {
    const newProduct = {
      id: ++this.sequenceId,
      ...product,
    }

    this.products.push(newProduct)

    return newProduct
  }

  findAll() {
    return this.products
  }

  findOne(id: number) {
    const product = this.products.find((product) => product.id == id)
    if (!product) {
      throw new NotFoundException(`Product with Id ${id} not found`)
    }

    return product
  }

  update(id: number, product: UpdateProductDTO) {
    const updateIndex = this.products.findIndex((product) => product.id == id)
    if (updateIndex < 0) {
      throw new NotFoundException(`Product with Id ${id} not found`)
    }

    this.products[updateIndex] = {
      ...this.products[updateIndex],
      ...product,
    }

    return this.products[updateIndex]
  }

  delete(id: number) {
    const deleteIndex = this.products.findIndex((product) => product.id == id)
    if (deleteIndex < 0) {
      throw new NotFoundException(`Product with Id ${id} not found`)
    }

    this.products.splice(deleteIndex, 1)
  }
}
