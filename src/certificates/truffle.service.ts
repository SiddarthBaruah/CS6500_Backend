// src/certificates/truffle.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Web3 from 'web3';
import contract from '@truffle/contract';
import CertificateArtifact from '../../build/contracts/CertificateRegistry_userInput.json';
import path from 'path';
import { error } from 'console';
const truffleConfig = require(path.resolve(process.cwd(), 'truffle-config.js'));

@Injectable()
export class TruffleService implements OnModuleInit {
  private web3: Web3;
  private instance: any;
  private defaultAccount: string;

  constructor(private cfg: ConfigService) {}

  async onModuleInit() {
    // 1) build a provider from your truffle-config.js
    const netCfg = truffleConfig.networks.development;
    const url = `http://${netCfg.host || '127.0.0.1'}:${netCfg.port}`;
    // 1) build an HTTP provider…
    const provider = new Web3.providers.HttpProvider(url) as any;

    // 2) make the “on”, “once”, etc., no-ops so Truffle doesn’t blow up:
    provider.on = () => {};
    provider.once = () => {};
    provider.removeListener = () => {};
    this.web3 = new Web3(provider);

    // 2) get Ganache’s unlocked accounts
    const accounts = await this.web3.eth.getAccounts();
    this.defaultAccount = accounts[0];

    // 3) wrap your Truffle artifact
    const Certificate = contract(CertificateArtifact as any);
    Certificate.setProvider(provider);
    // 4) grab the deployed instance
    this.instance = await Certificate.deployed();
  }

  async registerCertificate(user: string, certHash: string) {
    return this.instance.registerCertificate(certHash, user, {
      from: this.defaultAccount,
      gas: 300_000,
    });
  }

  async getCertificate(user: string): Promise<string> {
    return this.instance.getCertificate(user, {
      from: this.defaultAccount,
    });
  }
}
