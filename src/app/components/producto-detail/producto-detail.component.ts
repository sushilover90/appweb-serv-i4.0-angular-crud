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

  @Input() public product:Product;

  @Output() public switch_component = new EventEmitter();

  private update_product:boolean = false;

  public button_operation_text = "CREAR";

  constructor(private httpClientService:HttpClientService) { }

  ngOnInit(): void {

    console.log(this.product);

    if(this.product.name !=='' || this.product.price !==null){
      this.button_operation_text = "ACTUALIZAR";
      this.update_product = true;
    }

  }

  do_operation(){

    if(this.update_product){

      //const product_id:string = `ObjectId("${this.product._id}")`;

      this.httpClientService.makeRequest('patch',`${AuthService.api_url}/producto/update`, {
        body:{
          empresa_id:this.empresa.id,
          product_id:this.product._id,
          product_name:this.product.name,
          product_price:this.product.price
        }
      }).subscribe(
          data =>{
            console.log(data);
            this.go_back();
          }
      );

      return;
    }

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
