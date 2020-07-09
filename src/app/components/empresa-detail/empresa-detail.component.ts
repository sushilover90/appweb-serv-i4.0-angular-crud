import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {Empresa} from "../../interfaces/empresa";
import {HttpClientService} from "../../services/http-client.service";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-empresa-detail',
    templateUrl: './empresa-detail.component.html',
    styleUrls: ['./empresa-detail.component.css']
})
export class EmpresaDetailComponent implements OnInit {

    @Input() public empresa:Empresa;

    public button_operation_text:string = "CREAR";

    private update_empresa = false;

    @Output() public switch_component = new EventEmitter();

    constructor(private httpClientService:HttpClientService) {

    }

    ngOnInit(): void {

        console.log(this.empresa.id);

        if(this.empresa.name !=='' || this.empresa.address !==''){
            this.button_operation_text = "ACTUALIZAR";
            this.update_empresa = true;
        }

    }

    do_operation(){

        if(this.update_empresa){

            this.httpClientService.makeRequest('patch',`${AuthService.api_url}/empresa/update`, {
                body: {
                    id: this.empresa.id,
                    name: this.empresa.name,
                    address: this.empresa.address
                }
            }).subscribe(
                data=>{
                    this.go_back();
                });
            return;

        }

        this.httpClientService.makeRequest('post',`${AuthService.api_url}/empresa/register`, {
            body: {
                name: this.empresa.name,
                address: this.empresa.address
            }
        }).subscribe(
            data=>{
                this.go_back();
            });


    }

    go_back(){

        this.switch_component.emit(0);

    }

}
