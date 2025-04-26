// src/certificates/truffle.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Web3 from 'web3';
import contract from '@truffle/contract';
import CertificateArtifact from '../../build/contracts/CertificateRegistry_userInput.json';
import path from 'path';
import { error } from 'console';
const truffleConfig = require(path.resolve(process.cwd(), 'truffle-config.js'));
const HttpProvider = Web3.providers.HttpProvider as any;
if (typeof HttpProvider.prototype.sendAsync !== 'function') {
  HttpProvider.prototype.sendAsync = HttpProvider.prototype.send;
}
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
    // const provider = new Web3.providers.WebsocketProvider(
    //   'ws://127.0.0.1:8545',
    // ) as any;
    if (typeof provider.sendAsync !== 'function') {
      provider.sendAsync = provider.send.bind(provider);
    }
    // // 2) make the “on”, “once”, etc., no-ops so Truffle doesn’t blow up:
    provider.on = () => {};
    // provider.once = () => {};

    // provider.removeListener = () => {};
    // this.web3 = new Web3(provider);
    this.web3 = new Web3(provider);

    // 3) wrap your Truffle artifact
    const Certificate = contract(CertificateArtifact as any);
    Certificate.defaults({ pollingInterval: 200 });
    Certificate.setProvider(provider);

    // Explicitly set the network ID to match the deployed contract
    const networkId = await this.web3.eth.net.getId();
    Certificate.network_id = networkId;
    const accounts = await this.web3.eth.getAccounts();
    this.defaultAccount = accounts[0];
    // 4) grab the deployed instance
    this.instance = await Certificate.deployed();
  }

  async registerCertificate(user: string, certHash: string) {
    console.log(user);
    console.log(certHash);
    console.log(this.defaultAccount);
    // console.log(this.instance);
    return await this.instance.registerCertificate(certHash, user, {
      from: this.defaultAccount,
      gas: 1_000_000, // Increased gas limit to ensure sufficient resources
    });
  }

  async getCertificate(user: string): Promise<string> {
    return await this.instance.getCertificate(user, {
      from: this.defaultAccount,
    });
  }
}
