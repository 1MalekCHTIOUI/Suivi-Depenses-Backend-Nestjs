import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@Controller('api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/user/:id')
  async findAll(@Param('id') id: string): Promise<CategoryDto[]> {
    return this.categoryService.getCategoriesByUser(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoryDto> {
    return this.categoryService.getCategory(id);
  }

  @Post()
  async create(@Body() categoryDto: CategoryDto): Promise<CategoryDto> {
    return this.categoryService.createCategory(categoryDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() categoryDto: CategoryDto,
  ): Promise<CategoryDto> {
    return this.categoryService.updateCategory(id, categoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CategoryDto> {
    return this.categoryService.deleteCategory(id);
  }
}
