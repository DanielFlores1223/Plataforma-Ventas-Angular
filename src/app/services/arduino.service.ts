import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ArduinoService {
  private urlArd = 'http://localhost:3000/arduinos';

  constructor(private http : HttpClient) { }

  consultarTodoArd(){
    return this.http.get(this.urlArd);
  }

}
