import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth_service:AuthService, private router:Router) {

  }

  canActivate():boolean {

    if(this.auth_service.is_logged_in())
    {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }


}
