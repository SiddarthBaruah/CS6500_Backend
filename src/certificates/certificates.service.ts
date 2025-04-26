// src/certificates/certificates.service.ts
import { Injectable } from '@nestjs/common';
import { TruffleService } from './truffle.service';

@Injectable()
export class CertificatesService {
  constructor(private truffle: TruffleService) {}

  async register(user: string, certHash: string) {
    return await this.truffle.registerCertificate(user, certHash);
  }

  async fetch(user: string) {
    return await this.truffle.getCertificate(user);
  }
}
