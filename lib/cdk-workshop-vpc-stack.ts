import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

/**
 * VPC Stack
 */
export class CdkWorkshopVpcStack extends cdk.Stack {

    public readonly vpc: ec2.Vpc;   // VPC

    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // VPCを宣言
        this.vpc = new ec2.Vpc(this, 'WorkshopVPC', {
            // CIDR
            cidr: '10.1.0.0/16',
            // PublicとPrivateのサブネットを定義
            subnetConfiguration: [
                {
                    cidrMask: 24,
                    name: 'WorkshopPublicSubnet1',
                    subnetType: ec2.SubnetType.PUBLIC,
                },
                {
                    cidrMask: 24,
                    name: 'WorkshopPublicSubnet2',
                    subnetType: ec2.SubnetType.PUBLIC
                },
                {
                    cidrMask: 24,
                    name: 'WorkshopPrivateSubnet1',
                    subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
                },
                {
                    cidrMask: 24,
                    name: 'WorkshopPrivateSubnet2',
                    subnetType: ec2.SubnetType.PRIVATE_ISOLATED
                }
            ],
        });

        cdk.Tags.of(this.vpc).add('Type','Test');
    }
}