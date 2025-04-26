// src/certificates/certificates.module.ts
import { Module }              from '@nestjs/common';
import { ConfigModule }        from '@nestjs/config';
import { TruffleService }      from './truffle.service';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';

@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }) ],
  providers: [ TruffleService, CertificatesService ],
  controllers: [ CertificatesController ],
})
export class CertificatesModule {}
