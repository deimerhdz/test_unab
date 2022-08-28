import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Partido } from '../models/partido';

import { environment } from '../../environments/environment.prod';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  constructor(private http: HttpClient) { }
  
  get token(): string {
    return localStorage.getItem("token") || "";
  }
  get headers(){
    return { headers: { 'x-token': this.token } };
  }
   datetotime(template: any, date: any) {
    date = date.split( template[1] );
    template = template.split( template[1] );
    date = date[ template.indexOf('m') ]
        + "/" + date[ template.indexOf('d') ]
        + "/" + date[ template.indexOf('Y') ];

    return (new Date(date).getTime());
}
  crearPartido(data:Partido) {
    data.fecha=this.datetotime("d-m-Y",data.fecha);
   
    
   
    
    return this.http.post(`${base_url}/api/partidos`,data,this.headers);
  }

  traerPartido(){
    return this.http.get<Partido[]>(`${base_url}/api/partidos`, this.headers);
  }
  
  traerUno(id:number){
       return this.http.get(`${base_url}/api/partidos/${id}`,this.headers);
  }

  actualiarPartido(id: number,data: Partido){
    return this.http.put(`${base_url}/api/partidos/${id}`,data,this.headers);
}

}