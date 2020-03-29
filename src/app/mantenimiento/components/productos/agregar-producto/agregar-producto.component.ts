import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  Form:FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      nombre : ['',[Validators.required, Validators.minLength(3)]],
      precio: ['',[Validators.required]]
    })
  }

}
