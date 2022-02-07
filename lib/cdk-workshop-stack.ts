import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPCを宣言
    const vpc = new ec2.Vpc(this, 'WorkshopVPC', {
      // CIDR
      cidr: '10.1.0.0/16',
      // PublicとPrivateのサブネットを定義
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'WorkshopPublicSubnet',
          subnetType: ec2.SubnetType.PUBLIC
        },
        {
          cidrMask: 24,
          name: 'WorkshopPrivateSubnet',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED
        }
      ]
    });

    // Lambdaの実行ロールを宣言
    const role = new iam.Role(this, 'WorkshopRole', {
      // ロール名
      roleName: 'workshop-role',
      // LambdaサービスからこのロールにAssumeRoleできるよう設定
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      // ポリシーの宣言
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          'service-role/AWSLambdaVPCAccessExecutionRole'
        ),
      ],
    });

    // Lambdaリソースを宣言
    const hello = new lambda.Function(this, 'HelloHandler', {
      // ランタイムの指定
      runtime: lambda.Runtime.NODEJS_14_X,
      // lambdaディレクトリを指定
      code: lambda.Code.fromAsset('lambda'),
      // hello.jsのhandler関数を指定
      handler: 'hello.handler',
      // VPC内に配置
      vpc: vpc,
      // 実行ロールの設定
      role: role,
    });
  }
}