import { Injectable } from '@angular/core'
import { Http, Headers, Response } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/Rx'
import 'rxjs/add/observable/throw'

@Injectable()
export class ApiService {

  headers: Headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  })

  apiUrl: string = 'http://localhost:3500'

  constructor(private http: Http) {

  }

  private getJson(resp: Response) {
    return resp.json()
  }

  private checkForError(resp: Response): Response {
    if (resp.status >= 200 && resp.status < 300) {
      return resp;
    } else {
      const error = new Error(resp.statusText)
      error['response'] = resp
      console.error(error)
      throw error
    }
  }

  get(path: string): Observable<any> {
    return this.http
      .get(
        `${this.apiUrl}${path}`,
        { headers: this.headers },
      )
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }

  post(path: string, body: any): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}${path}`,
        JSON.stringify(body),
        { headers: this.headers },
      )
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }

  delete(path: string): Observable<any> {
    return this.http
      .delete(
        `${this.apiUrl}${path}`,
        { headers: this.headers },
      )
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }

  setHeaders(headers) {
    Object.keys(headers)
      .forEach(header => this.headers.set(header, headers[header]))
  }

}
