import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { User as IUser } from 'src/auth/entities/auth.entity';
import { catchError } from 'rxjs';

@Controller('notes')
export class NotesController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createNoteDto: CreateNoteDto, @User() user: IUser) {
    return this.client.send('notes.create', {
      ...createNoteDto,
      userId: user.id
    }).pipe(
      catchError(error => {
        throw new RpcException(error);
      })
    )
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@User() user: IUser) {
    return this.client.send('notes.findAll', user.id).pipe(
      catchError(error => {
        throw new RpcException(error);
      })
    )
  }


}
