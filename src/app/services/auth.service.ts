import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession
} from 'amazon-cognito-identity-js';
import { Injectable } from '@angular/core';
import AuthFailureError from '../errors/AuthFailureError';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userPool = new CognitoUserPool({
    UserPoolId: "us-east-1_oud83NQk8",
    ClientId: "3463d4fdcrpub7tvo5vkql9jh4"
  })

  public loadingSignin = false

  get accessToken() {
    const currentUser = this.userPool.getCurrentUser()
    if (!currentUser) {
      throw new AuthFailureError()
    }
    return new Promise<string>((resolve, reject) => {
      currentUser.getSession((err: any, session: CognitoUserSession) => {
        if (err) {
          reject(err)
        } else {
          const accessToken = session.getAccessToken().getJwtToken()
          resolve(accessToken)
        }
      })
    })
  }

  get idToken() {
    const currentUser = this.userPool.getCurrentUser()
    if (!currentUser) {
      throw new AuthFailureError()
    }
    return new Promise<string>((resolve, reject) => {
      currentUser.getSession((err: any, session: CognitoUserSession) => {
        if (err) {
          reject(err)
        } else {
          const idToken = session.getIdToken().getJwtToken()
          resolve(idToken)
        }
      })
    })
  }

  get username() {
    const cognitoUser = this.userPool.getCurrentUser()
    return cognitoUser?.getUsername()
  }

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
      this.loadingSignin = true

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result) => {
          this.loadingSignin = false
          resolve(result)
        },
        onFailure: (error) => {
          this.loadingSignin = false
          let message = ""
          switch (error.name) {
            case 'NotAuthorizedException':
              message = "Las credenciales proporcionadas no son válidas o no están autorizadas para acceder."
              break
            case 'UserNotFoundException':
              message = "No se encontró un usuario con la información proporcionada."
              break
            case 'InvalidParameterException':
              message = "Se proporcionó un parámetro no válido en la solicitud."
              break
            case 'UserNotConfirmedException':
              message = "El usuario aún no ha confirmado su cuenta. Por favor, verifica tu correo electrónico para confirmar la cuenta."
              break
            case 'CodeMismatchException':
              message = "El código proporcionado no coincide con el código esperado. Por favor, verifica el código e inténtalo nuevamente."
              break
            case 'PasswordResetRequiredException':
              message = "Es necesario restablecer la contraseña antes de poder autenticarse. Por favor, sigue las instrucciones para restablecer tu contraseña."
              break
            default:
              message = "Ha ocurrido un error durante la autenticación. Por favor, intenta nuevamente más tarde."
              break
          }
          reject(new Error(message))
        }
      })
    })
  }

  async logout() {
    const cognitoUser = this.userPool.getCurrentUser()
    if (cognitoUser) {
      cognitoUser.signOut()
    }
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
