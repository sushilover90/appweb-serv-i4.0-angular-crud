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

    public products:Array<Product> = null;

    @Input() public empresa:Empresa;

    @Output() public switch_prod_detail = new EventEmitter();

    @Output() public switch_component = new EventEmitter();

    constructor(private httpClientService:HttpClientService) { }

    ngOnInit(): void {

        console.log(this.empresa.id);

        this.fill_products()

    }

    do_operation(empresa){

        let product:Product = new class implements Product {
            _id: string | number;
            name: string;
            price: number;
        }

        product.name = '';
        product.price = null;

        const data = {
            empresa:empresa,
            product: product,
            switch_component: 3
        }

        this.switch_prod_detail.emit(data);

    }

    update_product(product:Product){

        const data = {
            empresa:this.empresa,
            switch_component: 3,
            product: product
        }

        this.switch_prod_detail.emit(data);

    }

    delete_product(product:Product){

        const url:string = `${AuthService.api_url}/producto/delete`;

        this.httpClientService.makeRequest('delete',url,{
           body:{
               empresa_id:this.empresa.id,
               product_id:product._id
           }
        }).subscribe(
            (data) => {
                console.log(data);
                this.fill_products()
            }
        );

    }

    go_back(){

        this.empresa = null;

        this.switch_component.emit(0);

    }

    fill_products(){

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

}
