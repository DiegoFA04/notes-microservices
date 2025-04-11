import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller()
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @MessagePattern('notes.create')
  create(@Payload() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @MessagePattern('notes.findAll')
  findAll(@Payload() userId: string) {
    return this.notesService.findAll(userId);
  }

  @MessagePattern('findOneNote')
  findOne(@Payload() id: number) {
    return this.notesService.findOne(id);
  }

  @MessagePattern('removeNote')
  remove(@Payload() id: number) {
    return this.notesService.remove(id);
  }
}
