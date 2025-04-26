// src/certificates/truffle.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import contract from '@truffle/contract';
import CertificateArtifact from '../../build/contracts/CertificateRegistry_userInput.json';
import path from 'path';
const truffleConfig = require(path.resolve(process.cwd(), 'truffle-config.js'));

@Injectable()
export class TruffleService implements OnModuleInit {
  private web3: Web3;
  private instance: any;
  private defaultAccount: string;
  constructor(private cfg: ConfigService) {}

  async onModuleInit() {
    // 1) build a provider from your truffle-config.js
    const abi = CertificateArtifact.abi as AbiItem[];
    const networkId = Object.keys(CertificateArtifact.networks)[0];
    const contractAddress = CertificateArtifact.networks[networkId].address;

    const netCfg = truffleConfig.networks.development;
    const url = `http://${netCfg.host || '127.0.0.1'}:${netCfg.port}`;

    this.web3 = new Web3(url);
    this.instance = new this.web3.eth.Contract(abi, contractAddress);

    const accounts: string[] = await this.web3.eth.getAccounts(); // :contentReference[oaicite:15]{index=15}
    this.defaultAccount = accounts[0];
  }

  async registerCertificate(user: string, certHash: string) {
    console.log(user);
    console.log(certHash);
    console.log(this.defaultAccount);
    // console.log(this.instance);
    return await this.instance.methods
      .registerCertificate(certHash, user)
      .send({
        from: this.defaultAccount,
        gas: 1_000_000, // Increased gas limit to ensure sufficient resources
      });
  }

  async getCertificate(user: string): Promise<string> {
    return await this.instance.methods.getCertificate(user).call();
  }
}
