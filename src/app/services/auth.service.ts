

import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import 'rxjs/Rx'
import { StoreHelper } from './store-helper'
import { Store } from '../store'
import { ApiService } from './api.service'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class AuthService implements CanActivate {

  jwtKey: string = 'retain-token'
  jwt: string = ''

  constructor(
    private router: Router,
    private storeHelper: StoreHelper,
    private store: Store,
    private api: ApiService,
  ) {
    const token = window.localStorage.getItem(this.jwtKey)
    if (token) {
      this.setJwt(token)
    }
  }

  setJwt(jwt: string) {
    window.localStorage.setItem(this.jwtKey, jwt)
    this.api.setHeaders({ Authorization: `Bearer ${jwt}`})
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

  authenticate(path, creds): Observable<any> {
    return this.api.post(`/${path}`, creds)
      .do(res => this.setJwt(res.token))
      .do(res => this.storeHelper.update('user', res.data))
      .map(res => {
        console.log('res', res)
        return res.data
      })
  }

  signout() {
    window.localStorage.removeItem(this.jwtKey)
    this.store.purge()
    this.router.navigate(['', 'auth'])
  }

}
