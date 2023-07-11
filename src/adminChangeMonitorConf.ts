import {Layer, Stage} from './utils';
import {Interface} from 'ethers';

export type Addresses = {
  L1: string[];
  L2: string[];
};
export const ADMIN_CHANGE_MONITOR_CONF: {[k in Stage]: Addresses} = {
  dev: {
    L1: [],
    L2: [
      '0x1cc15929e2c851C82E73fbF16737981623EE1326',
      '0xAB3C241168013C2C594774CC5B8e49eE34278040',
    ],
  },
  prod: {
    L1: [
      '0x7fbf5c9af42a6d146dcc18762f515692cd5f853b',
      '0xa342f5d851e866e18ff98f351f2c6637f4478db5',
      '0x2fc246149b4b8d7bcef6188a10af1791380227f1',
      '0xa4e177abead6758567ef78ffc150741187838cac',
      '0xeFa52F2F24A82fA27FAAe3c1eC3cCa52806d1aa7',
      '0x53B5f276a4b5A842B162b204f13c286a5C16C8b6',
      '0xf859e17efbcdf60ee9b951198aecd03b1cdd231c',
      '0x5CC5B05a8A13E3fBDB0BB9FcCd98D38e50F90c38',
      '0x03c545163bd114D756c65DDA1D97D37b89dA2236',
      '0x3845badade8e6dff049820680d1f14bd3903a5d0',
      '0x942DaEbbec2ab2307223E58E2C4360d4EBf88FA4',
      '0x800b36df64834f7b9d2A5670d73A6C3ef2e9588B',
      '0xa21342f796996954284B8DC6AAe7ecBF8f83A9e4',
      '0xa5d562c1f5dc561db10796f42b7f6933c5045152',
      '0x628F645A5A6D36fDE852b906ef18d38A128ed7d1',
      '0x921Fd42f147B26b51AA3c7fa3F2E2Ce7704c2858',
      '0xeae6fd7d8c1740f3f1b03e9a5c35793cd260b9a6',
      '0xE36F5350B097eA72e561EE154B45363c808a56D2',
      '0xC7dF86762ba83f2a6197e1Ff9Bb40ae0f696B9E6',
      '0xc7170a6c9218bfac05a5cd3d40003b0d04e8750a',
    ],
    L2: [
      '0xa090E057a7B3B397eFc0F3430659A05b6a41fA40',
      '0x8463b73ea174d04db5fff567c77be968666722b4',
      '0xc3f3ef3929392fdc697c5800d6cd18af73377a8f',
      '0xc6054f23bfe8ff4cdc9385fdd2c9e2744bb911e8',
      '0x5521b00e7952948babc84f052b5d017792784429',
      '0x1cc25b38d7eb7711e5acc2828d7577cb8a9f2de0',
      '0x90262e888bbf1f5f375a9286da324f2aeeeebec2',
      '0xbbba073c31bf03b8acf7c28ef0738decf3695683',
      '0x9d305a42a3975ee4c1c57555bed5919889dce63f',
      '0x16f78d75fabb869835236b5fb59c2b29f6cbbfcf',
      '0xCd1C7C85113b16A5B9e09576112d162281b5F860',
      '0x5df78ee0568befc4b1e5e9f3ac4611235c3e5f76',
      '0x64aec6e34862656f5c70dda4a9d5aebaae33c1ce',
      '0x214d52880b1e4E17d020908cd8EAa988FfDD4020',
      '0x4ab071c42c28c4858c4bac171f06b13586b20f30',
      '0xa6e383bda26e4c52a3a3a3463552c42494669abd',
      '0x7695b9ac52e49f1a8c4c554a072edb225eebfe70',
      '0x1ecf1791b8466eb3b859cc55b748b7872460f5b0',
      '0xD3A9CAa25393765c05ce9f332B5E33b5E33D8B8F',
      '0x6b4831e24F0cd73d4150EF4694aA87d6c104A774',
      '0x5cd67Daa17F708d6489E7Bb7648b7D0B823eA7bF',
      '0x3476190768dDd5bd2Dc0Fd82B1027281b0F8891f',
      '0x6709660a6237723f278188bCAE9E21b21eff8AAb',
    ],
  },
};

// TODO: Use contract names / validate addresses
export async function getAddresses(
  stage: Stage,
  layer: Layer
): Promise<string[]> {
  return ADMIN_CHANGE_MONITOR_CONF[stage][layer];
}

export async function getFunctionAbis(functions: string[]): Promise<string> {
  const iface = Interface.from(functions.map((x) => 'function ' + x));
  return iface.formatJson();
}
