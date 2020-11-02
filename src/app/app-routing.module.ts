import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//guardianes
import{ GuardiaSesionAdminGuard } from './guardias/guardia-sesion-admin.guard';
import { GuardiaPaginaInfoGuard } from './guardias/guardia-pagina-info.guard';

//componentes
import { HomeComponent } from './components/paginaInfo/home/home.component';
import { ContactoComponent } from './components/paginaInfo/contacto/contacto.component';
import { NosotrosComponent } from './components/paginaInfo/nosotros/nosotros.component';
import { RegistrarseComponent } from './components/paginaInfo/registrarse/registrarse.component';
import { InicioClienteComponent } from './components/Cliente/inicio-cliente/inicio-cliente.component';
import { InicioEmpleadoComponent } from './components/Empleado/inicio-empleado/inicio-empleado.component';

const routes: Routes = [
  //{ path: '**', pathMatch: 'full', redirectTo: 'inicio'},
  { path:'', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent, canActivate: [GuardiaPaginaInfoGuard]},
  { path: 'contacto', component: ContactoComponent, canActivate: [GuardiaPaginaInfoGuard]},
  { path: 'nosotros', component: NosotrosComponent, canActivate: [GuardiaPaginaInfoGuard]},
  { path: 'registrarse', component: RegistrarseComponent, canActivate: [GuardiaPaginaInfoGuard]},
  { path: 'inicio-Cliente', component: InicioClienteComponent, canActivate: [GuardiaSesionAdminGuard]},
  { path: 'inicio-Empleado',component: InicioEmpleadoComponent, canActivate: [GuardiaSesionAdminGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
