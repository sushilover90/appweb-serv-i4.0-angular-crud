import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClientService} from "../../services/http-client.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public email:string = '';
    public password:string = '';

    constructor(private httpClientService:HttpClientService, private router: Router) {

    }

    ngOnInit(): void {

    }

    password_keydown(e)
    {

        if(e.keyCode ===13)
        {
            e.preventDefault();
            this.log_in();
            return;
        }

    }


    log_in()
    {

        this.httpClientService.makeRequest('post','http://localhost:3333/user/login',
            {
                body: {
                    username: this.email,
                    password: this.password
                }
            }).
        subscribe(
            data => {
                localStorage.setItem('token',data.auth.token);
                localStorage.setItem('username',data.user);
                this.router.navigate(['/home']);
            }
        );

    }

}
