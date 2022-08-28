import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Equipo } from 'src/app/models/Equipo';
import { EquipoService } from 'src/app/services/equipo.service';
import { PartidoService } from 'src/app/services/partido.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-addpartido',
  templateUrl: './addpartido.component.html',
  styleUrls: ['./addpartido.component.css']
})
export class AddpartidoComponent implements OnInit {
  PartidoForm!: FormGroup;
  equipos: Equipo[]=[];
  constructor(private fb: FormBuilder,private equipoService:EquipoService, private partidoService:PartidoService, private usuarioService:UsuarioService, private router:Router) { }

  ngOnInit(): void {
    this.obtenerEquipos();
    this.PartidoForm = this.fb.group({
      fecha: ['', Validators.required],
      local: ['', Validators.required],
      visitante: ['', Validators.required],
      usuario:[this.usuarioService.id, Validators.required]

    })
  }
  agregarPartido(){
    
    console.log(this.PartidoForm.value);
     this.partidoService.crearPartido(this.PartidoForm.value).subscribe((res: any) => {
       console.log(res);

       alert(res.mgs);
this.router.navigateByUrl('/lista');
     })
  }

  obtenerEquipos(){
    this.equipoService.traerEquipos().subscribe((equipo:any)=>{
      console.log(equipo);
      this.equipos= equipo.equipos;
      console.log(this.equipos);
    })
  }

}
