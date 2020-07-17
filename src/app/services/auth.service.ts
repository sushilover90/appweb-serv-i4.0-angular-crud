import {Injectable, isDevMode} from '@angular/core';
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static readonly protocol = 'http';
  private static readonly host = 'localhost';
  private static readonly api_port = '3333';
  public static readonly api_url = AuthService.getUrl()

  is_logged_in():boolean
  {
    return localStorage.getItem('token') !== null;
  }

  private static getUrl(){

    if(!isDevMode())
    {
      return environment.apiUrl
    }

    //AuthService.protocol + '://' + AuthService.host + ':' + AuthService.api_port ;
    return `${AuthService.protocol}://${AuthService.host}:${AuthService.api_port}`

  }

  constructor() { }

}
