import { Component, OnInit } from '@angular/core';
import {HttpClientService} from "../../services/http-client.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public email:string = '';
  public password:string = '';
  public confirm_password:string = '';

  constructor(private httpClientService:HttpClientService,private router:Router) {

  }

  ngOnInit(): void {
  }

  register():void
  {


    this.httpClientService.makeRequest('post','http://localhost:3333/user/register',
        {
          body:{
            username: this.email,
            email: this.email,
            password: this.password
          }
        }).subscribe(
            data => this.router.navigate(['/login'])
    );

  }

}
