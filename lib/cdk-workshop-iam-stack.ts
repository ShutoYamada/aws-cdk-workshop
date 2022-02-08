import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

/**
 * IAM Stack
 */
export class CdkWorkshopIamStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

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

    cdk.Tags.of(role).add('Type','Test');

    // OutputとしてRoleArnを設定
    new cdk.CfnOutput(this, 'lambdaRoleExport', {
        value: role.roleArn,
        exportName: 'LambdaRoleArn'
    });
  }
}