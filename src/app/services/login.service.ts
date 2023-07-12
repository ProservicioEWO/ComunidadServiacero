import { Injectable } from '@angular/core';
import { User } from '../models/user';
import db from "../mock-users.json";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private users:User[]

  constructor() {
    this.users = db.users
  }

  tryLogin(alias: string, password: string): boolean {

    const user = this.users.find((user) => user.alias == alias)
    
    if(!user){
      throw new Error("El usuario no existe, intenta de nuevo por favor");
    }

    return user.password == password
  }
}
