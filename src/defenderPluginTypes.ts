import {
  YAutotask,
  YContract,
  YSentinel,
} from 'defender-serverless/src/types/index';
import {AWS} from '@serverless/typescript';
import {YNotification, YRelayer, YSecret} from 'defender-serverless/lib/types';
import {
  MonitorFilterTrigger,
  ScheduleTrigger,
  SentinelTrigger,
  WebhookTrigger,
} from '@openzeppelin/defender-autotask-client/lib/models/autotask';

export interface DefenderServerless
  extends Omit<AWS, 'provider' | 'resources'> {
  provider: {
    name: 'defender';
    stage: string;
    stackName: string;
    ssot?: boolean;
  };
  defender: {
    key: string | undefined;
    secret: string | undefined;
  };
  functions?: {
    [k: string]: YAutotask;
  };
  resources?: {
    Resources: {
      secrets?: {
        [contractName: string]: YSecret;
      };
      contracts?: {
        [contractName: string]: YContract;
      };
      sentinels?: {
        [contractName: string]: YSentinel;
      };
      notifications?: {
        [contractName: string]: YNotification;
      };
      relayers?: {
        [contractName: string]: YRelayer;
      };
    };
  };
}
