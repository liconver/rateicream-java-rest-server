import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  tokenUrl = "/api/token"

  constructor(private http: HttpClient) { }

  validateToken(token: string): Observable<any> {
    return this.http.post(this.tokenUrl, { token: token});
  }

  validateFbToken(token: string): Observable<any> {
    return this.http.post("/api/fbtoken", { token: token});
  }

}
