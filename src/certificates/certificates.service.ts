// src/certificates/certificates.service.ts
import { Injectable }      from '@nestjs/common';
import { TruffleService }  from './truffle.service';

@Injectable()
export class CertificatesService {
  constructor(private truffle: TruffleService) {}

  register(user: string, certHash: string) {
    return this.truffle.registerCertificate(user, certHash);
  }

  fetch(user: string) {
    return this.truffle.getCertificate(user);
  }
}
