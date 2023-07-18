import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession
} from 'amazon-cognito-identity-js';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userPool = new CognitoUserPool({
    UserPoolId: "us-east-1_oud83NQk8",
    ClientId: "3463d4fdcrpub7tvo5vkql9jh4"
  })

  public loading = false

  login(username: string, password: string): Promise<CognitoUserSession> {
    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password
    })

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.userPool
    })

    return new Promise((resolve, reject) => {
      this.loading = true

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result) => {
          this.loading = false
          resolve(result)
        },
        onFailure: (error) => {
          this.loading = false
          reject(error)
        }
      })
    })
  }

  async logout() {
    const cognitoUser = this.userPool.getCurrentUser()
    if(cognitoUser){
      cognitoUser.signOut()
    }
  }

  getUsername() {
    const cognitoUser = this.userPool.getCurrentUser()
    return cognitoUser?.getUsername()
  }

  isAuthenticated(): Promise<boolean> {
    const cognitoUser = this.userPool.getCurrentUser()

    if (!cognitoUser) {
      return Promise.resolve(false)
    }

    return new Promise((resolve, reject) => {
      cognitoUser.getSession((err: any, session: CognitoUserSession) => {
        if (err) {
          reject(err)
        } else if (!session.isValid()) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }
}
