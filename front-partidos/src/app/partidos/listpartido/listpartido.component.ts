import { Component, OnInit } from '@angular/core';

import { PartidoService } from '../../services/partido.service';
import {Partido} from '../../models/partido';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listpartido',
  templateUrl: './listpartido.component.html',
  styleUrls: ['./listpartido.component.css']
})
export class ListpartidoComponent implements OnInit {
  public partidos: Partido[] = [];
  constructor(private partidoService: PartidoService, private router: Router) { }

  ngOnInit(): void {
    this.traerPartidos();
  }

  traerPartidos() {
    this.partidoService.traerPartido().subscribe((partido: any) => {
      this.partidos = partido.Partidos;
      console.log(this.partidos);
    })
  }

  actualizar(id:number){
    this.router.navigateByUrl(`/actualizar/${id}`)
  }
}
