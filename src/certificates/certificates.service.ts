// src/certificates/certificates.service.ts
import { Injectable } from '@nestjs/common';
import { TruffleService } from './truffle.service';
import { Bytes } from 'web3';

@Injectable()
export class CertificatesService {
  constructor(private truffle: TruffleService) {}

  async register(user: string, certBytes: string) {
    return await this.truffle.registerCertificate(user, certBytes);
  }

  async fetch(user: string) {
    return await this.truffle.getCertificate(user);
  }

  async fetchall(){
    return await this.truffle.getAllUsers();
  }
}
