import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

type CdkWorkshopStackProps = {
  // Lambdaを配置するVPC
  lambdaVpc: ec2.Vpc;
} & Partial<cdk.StackProps>

export class CdkWorkshopStack extends cdk.Stack {

  constructor(scope: cdk.App, id: string, props: CdkWorkshopStackProps) {
    super(scope, id, props);

    // Lambdaの実行ロールを取得
    const lambdaRole = iam.Role.fromRoleArn(this, 'LambdaRole', cdk.Fn.importValue('LambdaRoleArn'));
    // Lambdaを格納するVPCを取得
    const lambdaVpc = props.lambdaVpc;

    // Lambdaリソースを宣言
    const hello = new lambda.Function(this, 'HelloHandler', {
      // ランタイムの指定
      runtime: lambda.Runtime.NODEJS_14_X,
      // lambdaディレクトリを指定
      code: lambda.Code.fromAsset('lambda'),
      // hello.jsのhandler関数を指定
      handler: 'hello.handler',
      // VPC内に配置
      vpc: lambdaVpc,
      // 実行ロールの設定
      role: lambdaRole
    });

    cdk.Tags.of(hello).add('Type','Test');
  }
}