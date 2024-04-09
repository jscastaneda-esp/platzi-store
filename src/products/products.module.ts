import { Module } from '@nestjs/common'
import { ProductsController } from './controllers/products.controller'
import { CategoriesController } from './controllers/categories.controller'
import { ProductsService } from './services/products.service'
import { CategoriesService } from './services/categories.service'
import { BrandsController } from './controllers/brands.controller'
import { BrandsService } from './services/brands.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Product, ProductSchema } from './entities/product.entity'
import { Category, CategorySchema } from './entities/category.entity'
import { Brand, BrandSchema } from './entities/brand.entity'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: Brand.name,
        schema: BrandSchema,
      },
    ]),
  ],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, CategoriesService, BrandsService],
  exports: [ProductsService],
})
export class ProductsModule {}
