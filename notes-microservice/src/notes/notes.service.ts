import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { PrismaClient } from 'generated/prisma';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class NotesService extends PrismaClient implements OnModuleInit {

  async onModuleInit() {
    await this.$connect();
  }

  async create(createNoteDto: CreateNoteDto) {
    try {
      return await this.note.create({
        data: createNoteDto,
      })
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: error.message
      })
    }
  }

  async findAll(id: string) {
    return await this.note.findMany({
      where: {
        userId: id
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }



  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
