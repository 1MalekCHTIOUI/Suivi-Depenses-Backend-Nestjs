/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { DepenseService } from './depense.service';
import { DepenseEntity } from './depense.entity';
import { DepenseDto } from './dto/DepenseDto.dto';

@Controller('api/depenses')
export class DepenseController {
  constructor(private readonly depenseService: DepenseService) {}

  @Post()
  async createDepense(@Body() DepenseDto: DepenseDto): Promise<DepenseEntity> {
    console.log('CONTROLLER: ', DepenseDto);

    return this.depenseService.createDepense(DepenseDto);
  }

  @Get('user/:userId')
  async getAllUserDepenses(
    @Param('userId') userId: string,
  ): Promise<DepenseEntity[]> {
    return this.depenseService.getAllUserDepenses(userId);
  }

  @Get(':depenseId')
  async getDepenseById(
    @Param('depenseId') depenseId: string,
  ): Promise<DepenseEntity> {
    return this.depenseService.getDepenseById(depenseId);
  }

  @Put(':depenseId')
  async updateDepense(
    @Param('depenseId') depenseId: string,
    @Body() DepenseDto: DepenseDto,
  ): Promise<DepenseEntity> {
    return this.depenseService.updateDepense(depenseId, DepenseDto);
  }

  @Delete(':depenseId')
  async deleteDepense(
    @Param('depenseId') depenseId: string,
  ): Promise<DepenseEntity> {
    return this.depenseService.deleteDepense(depenseId);
  }
}
