import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//componentes
import { HomeComponent } from './components/paginaInfo/home/home.component';
import { ContactoComponent } from './components/paginaInfo/contacto/contacto.component';

const routes: Routes = [
  //{ path: '**', pathMatch: 'full', redirectTo: 'inicio'},
  { path:'', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'contacto', component: ContactoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
