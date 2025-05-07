import { IsString, IsHexadecimal } from 'class-validator';

export class RegisterCertificateDto {
  @IsString()
  user: string;

  /**
   * DER-encoded certificate bytes, hex-encoded (0x prefixed)
   */
  @IsString()
  @IsHexadecimal({ message: 'certBytes must be a hex string, e.g. 0xabcd1234...' })
  certBytes: string;
}
