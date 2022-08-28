import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
   registrarForm!: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService:UsuarioService, private router:Router) { }

  ngOnInit(): void {
    this.registrarForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      username: ['', Validators.required],
      password:['', Validators.required]
    })

    
  }

  crearUsuario(){
    this.usuarioService.crear(this.registrarForm.value).subscribe((res: any) => {
      console.log(res)
      alert(res.mgs);
      this.router.navigateByUrl('/opciones')
    })
      }

}
