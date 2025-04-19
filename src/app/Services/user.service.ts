import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './Environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly http: HttpClient,
  ) { }



  userRegister(data: any):Observable<any> {
    return this.http.post<any>(`${environment.apiPath}User/Register`, data);
  }

  userLogin(data:any):Observable<any> {
    return this.http.post(`${environment.apiPath}User/Login`, data);
  }
}
