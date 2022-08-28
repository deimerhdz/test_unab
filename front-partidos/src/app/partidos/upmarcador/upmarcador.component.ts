import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { Equipo } from 'src/app/models/Equipo';
import { Partido } from 'src/app/models/partido';
import { EquipoService } from 'src/app/services/equipo.service';
import { PartidoService } from 'src/app/services/partido.service';

@Component({
  selector: 'app-upmarcador',
  templateUrl: './upmarcador.component.html',
  styleUrls: ['./upmarcador.component.css']
})
export class UpmarcadorComponent implements OnInit {
  actualizarForm!: FormGroup;
  partido: Partido;
  visitante: Equipo;
  local: Equipo;
  id: number;
  constructor(private fb: FormBuilder,private activatedRoute: ActivatedRoute, private partidoService: PartidoService, private equipoService: EquipoService, private router: Router) { }

  ngOnInit(): void {
    
    this.actualizarForm = this.fb.group({
      fecha: ['', Validators.required],
      local: ['', Validators.required],
      visitante: ['', Validators.required],
      goles_local:['', Validators.required],
      goles_visitante:['', Validators.required],
      
    })

    this.activatedRoute.params.subscribe(({ id }) => {
      this.id = id;
      
      
    })
    this.traerPartido(this.id);
  }

  
  actualizar(){
    console.log(this.actualizarForm.value)
       this.partidoService.actualiarPartido(this.id,this.actualizarForm.value).subscribe((res)=>{
          this.router.navigateByUrl('/lista')
       })
  }
  traerPartido(id:number){
    
    this.partidoService.traerUno(id).subscribe((partido: any) => {
      this.partido = partido.equipos;
      const observable = forkJoin({
        obs1: this.traervisitante(this.partido.visitante),
        obs2: this.traerlocal(this.partido.local),
  
      });
      observable.subscribe((value:any)=>{
        console.log(value);
        this.local = value.obs1.equipos;
        this.visitante = value.obs2.equipos
         this.actualizarForm.setValue({

            fecha: partido.equipos.fecha,
            local:value.obs1.equipos.id,
            visitante:value.obs2.equipos.id,
            goles_local: 0,
            goles_visitante:0
           })
      })
      // 
      // console.log(this.partido);
     
      
      // console.log(this.local);
      
      
       })
      }
  
  traervisitante(id:number){
  return this.equipoService.traerUno(id);
  }

  traerlocal(id:number){
    return this.equipoService.traerUno(id);
  }
}
