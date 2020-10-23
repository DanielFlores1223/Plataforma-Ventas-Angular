import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Importacion de componentes
import { HeaderComponent } from './components/paginaInfo/header/header.component';
import { FooterComponent } from './components/paginaInfo/footer/footer.component';
import { HomeComponent } from './components/paginaInfo/home/home.component';
import { ContactoComponent } from './components/paginaInfo/contacto/contacto.component';
import { ChatFacebookComponent } from './components/paginaInfo/chat-facebook/chat-facebook.component';
import { NosotrosComponent } from './components/paginaInfo/nosotros/nosotros.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactoComponent,
    ChatFacebookComponent,
    NosotrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
