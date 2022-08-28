import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Partido } from '../models/partido';

import { environment } from '../../environments/environment.prod';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor(private http: HttpClient) { }
  
  get token(): string {
    return localStorage.getItem("token") || "";
  }
  get headers(){
    return { headers: { 'x-token': this.token } };
  }

  traerEquipos(){
    return this.http.get<Partido[]>(`${base_url}/api/equipos/listar`, this.headers);
  }

  /*
  actualiarAcido(id,data){
       return this.http.put(`${base_url}/api/partidos/${id}`,data,this.headers);
  }*/

  traerUno(id:number){
    return this.http.get(`${base_url}/api/equipos/${id}`,this.headers);
}
  actualizar(){
    
  }

  
}