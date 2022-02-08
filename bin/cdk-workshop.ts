#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkWorkshopVpcStack } from '../lib/cdk-workshop-vpc-stack';
import { CdkWorkshopIamStack } from '../lib/cdk-workshop-iam-stack';
import { CdkWorkshopStack } from '../lib/cdk-workshop-stack';

const app = new cdk.App();

// VPC Stack
const cdkWorkshopVpcStack = new CdkWorkshopVpcStack(app, 'CdkWorkshopVpcStack');
// IAM Stack
const cdkWorkshopIamStack = new CdkWorkshopIamStack(app, 'CdkWorkshopIamStack');
// MainStack
const cdkWorkshopStack = new CdkWorkshopStack(app, 'CdkWorkshopStack', {
    lambdaVpc: cdkWorkshopVpcStack.vpc
});

// 依存関係を設定
// MainStackはVPCとIAMのStackに依存している
cdkWorkshopStack.addDependency(cdkWorkshopVpcStack);
cdkWorkshopStack.addDependency(cdkWorkshopIamStack);