import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static readonly protocol = 'http';
  private static readonly host = 'localhost';
  private static readonly api_port = '3333';
  public static readonly api_url =
      //AuthService.protocol + '://' + AuthService.host + ':' + AuthService.api_port ;
      `${AuthService.protocol}://${AuthService.host}:${AuthService.api_port}`

  is_logged_in():boolean
  {
    return localStorage.getItem('token') !== null;
  }

  constructor() { }
}
