/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DepenseEntity } from './depense.entity';
import { Model } from 'mongoose';
import { DepenseDto } from './dto/DepenseDto.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { CategoryService } from 'src/category/category.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DepenseService {
  constructor(
    @InjectModel(DepenseEntity.name) private depenseModel: Model<DepenseEntity>,
    private mailerService: MailerService,
    private catService: CategoryService,
    private userService: UserService,
  ) {}

  async createDepense(depenseDto: DepenseDto): Promise<DepenseEntity> {
    try {
      const { status, exceededAmount } = await this.isOverBudget(
        depenseDto.categoryId,
        depenseDto.montant,
      );
      const user = await this.userService.getUserById(depenseDto.userId);
      if (status) {
        let options = {
          message: `You just exceeded your budget for this category by: ${exceededAmount}, Please check your <a style="color:red" href="http://localhost:4200/list-depense"><strong>expenses</strong></a> and adjust your budget accordingly.`,
          subject: 'Budget Exceeded',
          to: user.email,
        };
        this.mailerService.sendMail(
          options.to,
          options.subject,
          options.message,
        );
      }
      return this.depenseModel.create(depenseDto);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllUserDepenses(userId: string): Promise<DepenseEntity[]> {
    return this.depenseModel
      .find({ userId })
      .populate('userId')
      .populate('categoryId')
      .populate('tagId');
  }

  async getDepenseById(depenseId: string): Promise<DepenseEntity> {
    return this.depenseModel.findById(depenseId).exec();
  }

  async isOverBudget(catId: string, montant: string) {
    try {
      const category = await this.catService.getCategory(catId);
      if (!category) {
        throw new Error(`Category with id ${catId} not found`);
      }
      const depenses = await this.depenseModel.find({ categoryId: catId });
      let depensesMontantSum: number = 0;

      depenses.forEach((dep: any) => {
        depensesMontantSum += Number(dep.montant);
      });
      depensesMontantSum += Number(montant);
      if (depensesMontantSum > Number(category.budget)) {
        return {
          status: true,
          exceededAmount: Number(depensesMontantSum - Number(category.budget)),
        };
      } else {
        return { status: false, exceededAmount: 0 };
      }
    } catch (error) {
      console.log(error);
      return { status: false, exceededAmount: 0 };
    }
  }

  async updateDepense(
    depenseId: string,
    DepenseDto: DepenseDto,
  ): Promise<DepenseEntity> {
    return this.depenseModel.findByIdAndUpdate(depenseId, DepenseDto, {
      new: true,
    });
  }

  async deleteDepense(depenseId: string): Promise<DepenseEntity> {
    return this.depenseModel.findByIdAndDelete(depenseId);
  }
}
