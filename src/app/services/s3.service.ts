import { Injectable } from '@angular/core';
import { GetObjectCommand, ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { AuthService } from './auth.service';
import AuthFailureError from '../errors/AuthFailureError';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { filter, from, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class S3Service {
  s3Client: S3Client

  constructor(private auth: AuthService) {
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

  getImage(key: string){
    const image = getSignedUrl(this.s3Client, new GetObjectCommand({
      Bucket: 'cs-static-res',
      Key: key
    }))
    return from(image)
  }

  getImages(path: string) {
    const list = this.s3Client.send(new ListObjectsV2Command({
      Bucket: 'cs-static-res',
      Prefix: path
    }))

    return from(list).pipe(
      map(e => e.Contents ?? []),
      switchMap(e => (
        Promise.all(e.filter(e => !!e.Size).map(
          async ({ Key }) => await getSignedUrl(
            this.s3Client, new GetObjectCommand({
              Key,
              Bucket: 'cs-static-res'
            }), {expiresIn: 5000}
          )
        ))
      ))
    )
  }
}
