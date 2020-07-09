import { Component, OnInit } from '@angular/core';
import {HttpClientService} from "../../services/http-client.service";
import {Empresa} from "../../interfaces/empresa";
import {AuthService} from "../../services/auth.service";
import {ArrayType} from "@angular/compiler";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public switch_component:number = 0;

  // the empresa which was chosen from the list
  public empresa:Empresa;

  public username:string = null;

  constructor(private httpClientService: HttpClientService) {}

  ngOnInit(): void {

    this.username = localStorage.getItem('username');

    this.empresa = new class implements Empresa {
      address: string;
      created_at: string;
      id: number | string;
      name: string;
      updated_at: string;
    };

  }

  _switch_component(component_code){

    this.switch_component = component_code;

  }

  _switch_component_data(data){

    if(data.empresa !== null || true)
      this.empresa = data.empresa;

    this.switch_component = data.switch_component;
  }

  create_empresa(data){

    this.empresa.id = null;
    this.empresa.name = "";
    this.empresa.address = "";
    this.empresa.created_at = null;
    this.empresa.updated_at = null;

    this._switch_component(data);


  }


}
