import { Component, Input,Output, EventEmitter, OnInit } from '@angular/core';
import {HttpClientService} from "../../services/http-client.service";
import {AuthService} from "../../services/auth.service";
import {Product} from "../../interfaces/product";
import {Empresa} from "../../interfaces/empresa";

@Component({
    selector: 'app-producto-list',
    templateUrl: './producto-list.component.html',
    styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {

    @Input() public empresa:Empresa;

    @Output() public switch_prod_detail = new EventEmitter();

    public products:Array<Product> = null;

    @Output() public switch_component = new EventEmitter();

    constructor(private httpClientService:HttpClientService) { }

    ngOnInit(): void {

        console.log(this.empresa.id);

        this.products = [];

        this.httpClientService.makeRequest('post',`${AuthService.api_url}/producto/get`,{
            body:{
                empresa_id: this.empresa.id
            }
        }).subscribe(
                data=> {
                    console.log(data);
                    data.forEach(
                        // @ts-ignore
                        element => this.products.push(element[0])
                    );
                },
                error => {
                    console.log(error)
                }
            );

    }

    do_operation(empresa){

        const data = {
            empresa:empresa,
            switch_component: 3
        }

        this.switch_prod_detail.emit(data);

    }

    go_back(){

        this.empresa = null;

        this.switch_component.emit(0);

    }

}
