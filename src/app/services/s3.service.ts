import { Injectable } from '@angular/core';
import { S3Client } from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { AuthService } from './auth.service';
import AuthFailureError from '../errors/AuthFailureError';

@Injectable({
  providedIn: 'root'
})
export class S3Service {
  private s3Client: S3Client

  constructor(private auth: AuthService) {
    let token: string | null = null
    this.auth.idToken.then(value => {
      this.s3Client = new S3Client({
        region: 'us-east-1',
        credentials: fromCognitoIdentityPool({
          identityPoolId: 'us-east-1:80f0cb2c-4696-40d1-abad-db84a85d70d4',
          clientConfig: {
            region: 'us-east-1'
          },
          logins: {
            "cognito-idp.us-east-1.amazonaws.com/us-east-1_oud83NQk8": value
          }
        })
      })
    })

  }
}
