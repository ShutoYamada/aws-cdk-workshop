import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as CdkWorkshop from '../lib/cdk-workshop-stack';

test('Lambda Function Created', () => {
  const app = new cdk.App();
  
  // MyTestStackを生成
  const stack = new CdkWorkshop.CdkWorkshopStack(app, 'MyTestStack');

  const template = Template.fromStack(stack);
  // Lambda関数が1つ生成されていること
  template.resourceCountIs('AWS::Lambda::Function', 1);
});
