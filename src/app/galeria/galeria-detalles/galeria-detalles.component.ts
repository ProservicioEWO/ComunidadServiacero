import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import AuthFailureError from 'src/app/errors/AuthFailureError';
import { ImageSrc } from 'src/app/models/ImageSrc';
import { AuthService } from 'src/app/services/auth.service';
import { State } from 'src/app/utils/State';

@Component({
  selector: 'app-galeria-detalles',
  templateUrl: './galeria-detalles.component.html',
  styleUrls: ['./galeria-detalles.component.scss']
})
export class GaleriaDetalles implements OnInit {
  private idToken: string | null = null

  imagesState = {
    data: null,
    error: null,
    loading: false
  } as State<ImageSrc[]>

  constructor(private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit() {
    this.auth.idToken.then(token => {
      const s3Client = new S3Client({
        region: 'us-east-1',
        credentials: fromCognitoIdentityPool({
          identityPoolId: 'us-east-1:80f0cb2c-4696-40d1-abad-db84a85d70d4',
          clientConfig: {
            region: 'us-east-1'
          },
          logins: {
            "cognito-idp.us-east-1.amazonaws.com/us-east-1_oud83NQk8": token
          }
        })
      })

      this.route.paramMap.subscribe(params => {
        const eventId = params.get("variable")
        if (eventId) {
          this.imagesState.loading = true
          s3Client.send(new ListObjectsV2Command({
            Bucket: 'cs-static-res',
            Prefix: `images/gallery/${eventId}/`
          })).then(data => {
            const imgs = data.Contents?.filter(f => !!f.Size)
            if (imgs) {
              Promise.all(
                imgs.map(async ({ Key }) => (
                  await getSignedUrl(s3Client, new GetObjectCommand({
                    Bucket: 'cs-static-res', Key
                  }), { expiresIn: 600 })
                ))
              )
                .then(data => {
                  this.imagesState.data = data.map(i => ({
                    image: i,
                    thumbImage: i,
                    title: '',
                    alt: '',
                  }))
                })
                .catch(err => this.imagesState.error = err)
                .finally(() => this.imagesState.loading = false)
            }
          })
        }
      })
    })

  }

}
