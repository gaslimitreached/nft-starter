#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { Dapp } from './infra';
import { Builder } from '@sls-next/lambda-at-edge';

const builder = new Builder(".", "./build", {args: ['build']});

builder.build(true).then(() => {
  const app = new cdk.App();
  new Dapp(app, 'DappStack', {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  });
});


