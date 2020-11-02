import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//servicios
import {LoginService} from './services/login.service';

//Importacion de componentes
import { HeaderComponent } from './components/paginaInfo/header/header.component';
import { FooterComponent } from './components/paginaInfo/footer/footer.component';
import { HomeComponent } from './components/paginaInfo/home/home.component';
import { ContactoComponent } from './components/paginaInfo/contacto/contacto.component';
import { ChatFacebookComponent } from './components/paginaInfo/chat-facebook/chat-facebook.component';
import { NosotrosComponent } from './components/paginaInfo/nosotros/nosotros.component';
import { RegistrarseComponent } from './components/paginaInfo/registrarse/registrarse.component';
import { LoginComponent } from './components/paginaInfo/login/login.component';
import { HeaderClienteComponent } from './components/Cliente/header-cliente/header-cliente.component';
import { InicioClienteComponent } from './components/Cliente/inicio-cliente/inicio-cliente.component';
import { SidebarEmpleadoComponent } from './components/Empleado/sidebar-empleado/sidebar-empleado.component';
import { InicioEmpleadoComponent } from './components/Empleado/inicio-empleado/inicio-empleado.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactoComponent,
    ChatFacebookComponent,
    NosotrosComponent,
    RegistrarseComponent,
    LoginComponent,
    HeaderClienteComponent,
    InicioClienteComponent,
    SidebarEmpleadoComponent,
    InicioEmpleadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule 
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
