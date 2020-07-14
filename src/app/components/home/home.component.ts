import { Component, OnInit } from '@angular/core';
import {HttpClientService} from "../../services/http-client.service";
import {Empresa} from "../../interfaces/empresa";
import {AuthService} from "../../services/auth.service";
import {ArrayType} from "@angular/compiler";
import {Router} from "@angular/router";
import {Product} from "../../interfaces/product";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public switch_component:number = 0;

  // the empresa which was chosen from the empresa list
  public empresa:Empresa;

  public username:string = null;

  // the product which was chosen from the product list
  public product:Product;

  constructor(private router:Router) {}

  ngOnInit(): void {

    this.username = localStorage.getItem('username');

    this.empresa = new class implements Empresa {
      address: string;
      created_at: string;
      id: number | string;
      name: string;
      updated_at: string;
    };

    this.product = new class implements Product {
      _id: string | number;
      name: string;
      price: number;
    }

  }

  _switch_component(component_code){

    this.switch_component = component_code;

  }

  _switch_component_data(data){

    if(data.empresa !== null || true)
      this.empresa = data.empresa;

    if(data.product !== null || true)
      this.product = data.product;

    console.log(`Home.product= ${this.product}`);

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

  log_out(){

    localStorage.clear();
    this.router.navigate(['/login']);

  }


}
