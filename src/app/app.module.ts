import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from "@angular/forms";
import {HttpClientService} from "./services/http-client.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { RegisterComponent } from './components/register/register.component';
import {AuthHttpInterceptor} from "./classes/auth-http-interceptor.service";
import { HomeComponent } from './components/home/home.component';
import { EmpresaListComponent } from './components/empresa-list/empresa-list.component';
import { EmpresaDetailComponent } from './components/empresa-detail/empresa-detail.component';
import { ProductoListComponent } from './components/producto-list/producto-list.component';
import { ProductoDetailComponent } from './components/producto-detail/producto-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EmpresaListComponent,
    EmpresaDetailComponent,
    ProductoListComponent,
    ProductoDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
      HttpClientService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
