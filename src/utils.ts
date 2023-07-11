import {Network} from '@openzeppelin/defender-base-client';
import {YContract} from 'defender-serverless/lib/types';
import fs from 'fs';
import {load} from 'js-yaml';
import path from 'path';

export type Stage = 'dev' | 'prod';
export type Layer = 'L1' | 'L2';
export type NetConf = {
  network: Network;
  contractPath: string;
};
export type Networks = {
  L1: NetConf;
  L2: NetConf;
};
export const STAGE_2_NETWORKS: {[k in Stage]: Networks} = {
  dev: {
    L1: {
      network: 'goerli',
      contractPath: 'goerli',
    },
    L2: {
      network: 'mumbai',
      contractPath: 'mumbai',
    },
  },
  prod: {
    L1: {
      network: 'mainnet',
      contractPath: 'mainnet',
    },
    L2: {
      network: 'matic',
      contractPath: 'polygon',
    },
  },
};

export function getStageFromArgs(): Stage {
  // Used to print, it will fails with sls
  if (process.env.STAGE) {
    return process.env.STAGE as Stage;
  }
  const idx = process.argv.findIndex((x) => x === '--stage');
  if (idx < 0 || idx >= process.argv.length - 1) {
    throw new Error('Invalid stage argument');
  }
  return process.argv[idx + 1] as Stage;
}

export function getNetConf(stage: Stage): Networks {
  return STAGE_2_NETWORKS[stage];
}

export async function getContract(
  netConf: Networks,
  layer: Layer,
  contractName: string,
  packagePath = '@sandbox-smart-contracts/core/deployments'
): Promise<YContract> {
  const fileName = `${packagePath}/${netConf[layer].contractPath}/${contractName}.json`;
  const contract = await import(fileName);
  const name = layer + '_' + contractName;
  return {
    name,
    network: netConf[layer].network,
    abi: contract.abi,
    address: contract.address,
  };
}

export async function getMessage(key: string): Promise<string> {
  const ret = load(
    fs.readFileSync(path.join(__dirname, 'messages.yml'), 'utf8')
  ) as {[k: string]: string};
  return ret[key];
}

export function getProcessEnv(print: boolean, key: string) {
  const ret = process.env[key];
  if (!ret) {
    throw new Error(key + ' must be configured in .env');
  }
  return print ? 'X'.repeat(ret.length) : ret;
}
