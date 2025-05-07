// src/certificates/certificates.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { RegisterCertificateDto } from './dto/register-certificate.dto';

@Controller('certificates')
export class CertificatesController {
  constructor(private svc: CertificatesService) {}

  @Post()
  async create(@Body() dto: RegisterCertificateDto) {
    const receipt = await this.svc.register(dto.user, dto.certBytes);
    return { transactionHash: receipt.transactionHash };
  }

  @Get(':user')
  async find(@Param('user') user: string) {
    const certBytes = await this.svc.fetch(user);
    return { user, certBytes };
  }

  @Get()
  async findAll(){
    const users = await this.svc.fetchall();
    return users
  }
}
