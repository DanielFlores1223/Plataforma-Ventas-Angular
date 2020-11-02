import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

//servicio
import {LoginService} from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardiaSesionAdminGuard implements CanActivate {
  /*canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }*/

  constructor(private rutas: Router, private loginService: LoginService){}

  canActivate(): boolean{
    if (this.loginService.loginExito()) {
        return true;
    }else{
      this.rutas.navigate(['/inicio']);
      return false;
    }
  }
  
}
