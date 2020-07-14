import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClientService} from "../../services/http-client.service";
import {AuthService} from "../../services/auth.service";
import {Empresa} from "../../interfaces/empresa";
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css']
})
export class EmpresaListComponent implements OnInit {

  @Output() public switch_emp_detail = new EventEmitter();

  @Output() public switch_prod_list = new EventEmitter();

  @Output() public insert_empresa = new EventEmitter();

  public empresas_list:Array<Empresa> = null;

  constructor(private httpClientService:HttpClientService) { }

  ngOnInit(): void {

    this.empresas_list = [];

    this.fetch_empresas();

  }

  fetch_empresas(){

    const url = `${AuthService.api_url}/empresa/get`;

    this.httpClientService.makeRequest('get',url)
        .subscribe(
            data=>this.empresas_list = data
        );

  }

  update_empresa(empresa){

    const data = {
      switch_component: 1,
      empresa: empresa
    }

    this.switch_emp_detail.emit(data);
  }

  create_empresa(){

      this.insert_empresa.emit(1);

  }

  delete_empresa(empresa){

    this.httpClientService.makeRequest('delete',`${AuthService.api_url}/empresa/delete`,
        {
          body:{
            id:empresa.id
          }
        })
        .subscribe(
            data=>{
              console.log(data);
              this.fetch_empresas();
            }
        )

  }

  fetch_productos(empresa){

    const data = {
      switch_component: 2,
      empresa: empresa
    }

    this.switch_prod_list.emit(data);

  }

}
