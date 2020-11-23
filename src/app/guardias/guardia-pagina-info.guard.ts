import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
//servicio
import {LoginService} from '../services/login.service';
@Injectable({
  providedIn: 'root'
})
export class GuardiaPaginaInfoGuard implements CanActivate {
  /*
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  */

 constructor(private rutas: Router, private loginService: LoginService){}

 canActivate(): boolean{
   if (!this.loginService.loginExito()) {
        return true;
   
      }else if(this.loginService.tipoUsu() == 'Admin' || this.loginService.tipoUsu() == 'Bodega' ||         this.loginService.tipoUsu() == 'Cajero'){
                this.rutas.navigate(['/inicio-Empleado']);
                return false;
   
    }else if(this.loginService.tipoUsu() == 'Cliente'){
              //this.rutas.navigate(['/inicio-Cliente']);
              return true;
   }
 }
}
