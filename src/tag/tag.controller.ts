import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { TagDto } from './dto/tag.dto';

@Controller('api/tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('user/:id')
  findAll(@Param('id') id: string): Promise<TagDto[]> {
    try {
      return this.tagService.getTagsByUser(id);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TagDto> {
    return this.tagService.getTag(id);
  }

  @Post()
  create(@Body() tagDto: TagDto): Promise<TagDto> {
    console.log(tagDto);

    return this.tagService.createTag(tagDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() tagDto: TagDto): Promise<TagDto> {
    console.log(id);
    console.log(TagDto);

    return this.tagService.updateTag(id, tagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<TagDto> {
    return this.tagService.deleteTag(id);
  }
}
