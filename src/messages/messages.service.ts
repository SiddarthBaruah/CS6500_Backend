import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly msgRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const message = this.msgRepository.create(createMessageDto);
    return await this.msgRepository.save(message);
  }

  async findAll() {
    return await this.msgRepository.find();
  }

  async findOne(id: number) {
    return await this.msgRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const city = await this.findOne(id);
    if (!city) {
      throw new NotFoundException();
    }
    Object.assign(city, updateMessageDto);
    return await this.msgRepository.save(city);
  }

  async remove(id: number) {
    const city = await this.findOne(id);
    if (!city) {
      throw new NotFoundException();
    }
    return await this.msgRepository.remove(city);
  }
}
