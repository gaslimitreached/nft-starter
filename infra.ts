// stack.ts
import { NextJSLambdaEdge } from "@sls-next/cdk-construct";
import * as cdk from "@aws-cdk/core";
// uncomment for custom domain
// import { Certificate } from "@aws-cdk/aws-certificatemanager";
// import { HostedZone }  from "@aws-cdk/aws-route53";

//const AWS_CERT_ARN = process.env.AWS_CERT_ARN || '';

export class Dapp extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);
    new NextJSLambdaEdge(this, "Dapp", {
      serverlessBuildOutDir: "./build",
//      domain: {
//        domainNames: ['example.website'],
//        hostedZone: HostedZone.fromHostedZoneAttributes(this, "Zone", {
//          hostedZoneId: "HOSTED_ZONE_ID",
//          zoneName: "example.website"
//        }),
//        certificate: Certificate.fromCertificateArn(
//          this,
//          "Cert",
//          AWS_CERT_ARN
//        )
//      },
    });
  }
}
