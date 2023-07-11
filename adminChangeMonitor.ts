import * as dotenv from 'dotenv';
import {dump} from 'js-yaml';
import {
  getMessage,
  getNetConf,
  getProcessEnv,
  getStageFromArgs,
  Layer,
  Networks,
  Stage,
} from './src/utils';
import {YNotification, YSentinel} from 'defender-serverless/src/types/index';
import {DefenderServerless} from './src/defenderPluginTypes';
import {getAddresses, getFunctionAbis} from './src/adminChangeMonitorConf';
import {inspect} from 'util';
import {Network} from '@openzeppelin/defender-base-client';

dotenv.config({path: __dirname + '/.env'});

export async function getSlackNotifyChannel(
  url: string
): Promise<YNotification> {
  return {
    type: 'slack',
    name: 'Slack notification channel',
    paused: false,
    config: {
      url,
    },
  };
}

export async function getSentinel(
  name: string,
  netConf: Networks,
  addresses: string[],
  network: Network,
  message: string,
  channels: YNotification[]
): Promise<YSentinel> {
  const functions = [
    'changeAdmin(address)',
    'transferOwnership(address)',
    'setMinter(address,bool)',
    'setSuperOperator(address,bool)',
  ];
  return {
    name,
    type: 'BLOCK',
    paused: false,
    network,
    addresses,
    abi: await getFunctionAbis(functions),
    'confirm-level': 1,
    'notify-config': {
      message,
      channels,
    },
    conditions: {
      event: [],
      function: functions.map((x) => ({signature: x})),
    },
    'risk-category': 'ACCESS-CONTROL',
  };
}

export async function getSentinels(
  netConf: Networks,
  stage: Stage,
  message: string,
  channels: YNotification[]
): Promise<{[sentinelName: string]: YSentinel}> {
  const ret: YSentinel[] = [];
  for (const l of ['L1', 'L2']) {
    const layer = l as Layer;
    const addresses = await getAddresses(stage, layer);
    if (addresses.length > 0) {
      ret.push(
        await getSentinel(
          l + '-admin-change-monitor',
          netConf,
          addresses,
          netConf[layer].network,
          message,
          channels
        )
      );
    }
  }
  if (ret.length === 0) {
    throw new Error('Some address must be configured');
  }
  return ret.reduce(
    (acc, val) => ({
      ...acc,
      [val.name]: val,
    }),
    {}
  );
}

export async function config(print: boolean): Promise<DefenderServerless> {
  const name = 'admin-change-monitor';
  const stage = getStageFromArgs();
  const netConf = getNetConf(stage);
  if (!process.env.SLACK_URL) {
    throw new Error('SLACK_URL must be configured');
  }
  const slackNotification = await getSlackNotifyChannel(
    getProcessEnv(print, 'SLACK_URL')
  );
  const message = await getMessage('info-message');
  const ret: DefenderServerless = {
    service: 'sandbox',
    configValidationMode: 'error',
    frameworkVersion: '3',
    plugins: ['defender-serverless'],
    provider: {
      name: 'defender',
      stage: "${opt:stage, 'dev'}",
      stackName: `sandbox_${name}`,
      ssot: false,
    },
    defender: {
      key: getProcessEnv(print, 'DEFENDER_KEY'),
      secret: getProcessEnv(print, 'DEFENDER_SECRET'),
    },
    resources: {
      Resources: {
        notifications: {
          slackNotification,
        },
        sentinels: await getSentinels(netConf, stage, message, [
          slackNotification,
        ]),
      },
      // This is not needed, but we leave it as an example
      // contracts: {
      //   Sand: await getContract(netConf, 'L1', 'Sand'),
      //   PolygonSand: await getContract(netConf, 'L2', 'PolygonSand'),
      // },
    },
  };
  if (print) {
    inspect.defaultOptions.depth = null;
    console.log(dump(ret));
  }
  return ret;
}

module.exports = config(require.main === module);
