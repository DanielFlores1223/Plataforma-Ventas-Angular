import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private urlEmp = 'http://localhost:3000/empleados';

  constructor(private http : HttpClient) { }

  regEmp( empleado ){
    return this.http.post<any>(this.urlEmp, empleado);
  }

  consultarEmpCorreo( correo ){
    return this.http.post<any>(this.urlEmp + "/buscar-emp-correo", correo);
  }

  consultarTodoEmp(){
    return this.http.get(this.urlEmp);
  }
  

}

