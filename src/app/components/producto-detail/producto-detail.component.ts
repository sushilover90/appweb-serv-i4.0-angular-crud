import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {Empresa} from "../../interfaces/empresa";
import {Product} from "../../interfaces/product";
import {HttpClientService} from "../../services/http-client.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css']
})
export class ProductoDetailComponent implements OnInit {

  @Input() public empresa:Empresa;

  public product:Product = null;

  @Output() public switch_component = new EventEmitter();

  constructor(private httpClientService:HttpClientService) { }

  ngOnInit(): void {

    this.product = new class implements Product {
      _id: string | number;
      name: string;
      price: number;
    }

  }

  do_operation(){

    this.httpClientService.makeRequest('post',`${AuthService.api_url}/producto/register`, {
      body:{
        empresa_id:this.empresa.id,
        product_name:this.product.name,
        product_price:this.product.price
      }
    }).subscribe(
        data =>{
          console.log(data);
          this.go_back();
        }
    );

  }

  go_back(){

    this.switch_component.emit(2);

  }

}
