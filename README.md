# WIP

A simple example with some tweaks:
1. We use serverless.ts typescript configuration
2. We import the contracts using npm instead of git submodules


## About dependencies

Right now we are not publishing our `core` package so the full repo is included as a dependency:
`"contracts": "git+https://github.com/thesandboxgame/sandbox-smart-contracts.git` this will be fixed later.

## Usage:

copy `env.example` file to `.env`, fill the variables

- `yarn sls:dev:print adminChangeMonitor.ts`
- `yarn sls:dev adminChangeMonitor.ts`
- `yarn sls:dev:clean adminChangeMonitor.ts`

`adminChangeMonitor.ts` can be any usable serverless config file
