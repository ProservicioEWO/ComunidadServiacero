import { AuthService } from './auth.service';
import { from, map, switchMap } from 'rxjs';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { GetObjectCommand, ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class S3Service {
  s3Client: S3Client

  constructor(private auth: AuthService) { }

  async getObject(key: string) {
    const s3Client = new S3Client({
      region: 'us-east-1',
      credentials: fromCognitoIdentityPool({
        identityPoolId: 'us-east-1:80f0cb2c-4696-40d1-abad-db84a85d70d4',
        clientConfig: {
          region: 'us-east-1'
        },
        logins: {
          "cognito-idp.us-east-1.amazonaws.com/us-east-1_oud83NQk8": await this.auth.idToken
        }
      })
    })

    const image = getSignedUrl(s3Client, new GetObjectCommand({
      Bucket: 'cs-static-res',
      Key: key
    }))
    return from(image)
  }

  async getObjects(path: string) {
    const s3Client = new S3Client({
      region: 'us-east-1',
      credentials: fromCognitoIdentityPool({
        identityPoolId: 'us-east-1:80f0cb2c-4696-40d1-abad-db84a85d70d4',
        clientConfig: {
          region: 'us-east-1'
        },
        logins: {
          "cognito-idp.us-east-1.amazonaws.com/us-east-1_oud83NQk8": await this.auth.idToken
        }
      })
    })

    const list = s3Client.send(new ListObjectsV2Command({
      Bucket: 'cs-static-res',
      Prefix: path
    }))

    return from(list).pipe(
      map(e => e.Contents ?? []),
      switchMap(e => (
        Promise.all(e.filter(e => !!e.Size).map(
          async ({ Key }) => await getSignedUrl(
            s3Client, new GetObjectCommand({
              Key,
              Bucket: 'cs-static-res'
            }), { expiresIn: 5000 }
          )
        ))
      ))
    )
  }
}