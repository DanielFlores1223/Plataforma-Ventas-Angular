import { Component, HostBinding, OnInit } from '@angular/core';
//servicios
import { LoginService } from './services/login.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'plataforma-ventas-angular';

  @HostBinding('class.is-open')

  entro = false;
  tipo = "";
  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
      this.loginService.change.subscribe(isOpen => {
        this.entro = isOpen;
      });

      this.loginService.change1.subscribe(isOpen =>{
        this.tipo = isOpen;
      });

      this.entro = this.loginService.loginExito();
      this.tipo = this.loginService.tipoUsu();
  }

 
}
