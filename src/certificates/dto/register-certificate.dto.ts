import { IsString } from 'class-validator';

export class RegisterCertificateDto {
  @IsString()
  user: string;

  @IsString()
  certHash: string;
}
