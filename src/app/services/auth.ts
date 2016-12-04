

import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import 'rxjs/Rx'

@Injectable()
export class AuthService implements CanActivate {

  jwtKey: string = 'retain-token'
  jwt: string = ''

  constructor(private router: Router) {

  }
  isAuthorized(): boolean {
    return Boolean(this.jwt)
  }


  canActivate(): boolean {
    const canActivate = this.isAuthorized()
    this.onCanActivate(canActivate)
    return canActivate
  }

  onCanActivate(canActivate: boolean) {
    if (!canActivate) {
      this.router.navigate(['', 'auth'])
    }
  }
}
