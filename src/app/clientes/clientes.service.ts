import { Injectable } from '@angular/core';
import { Cliente, Grupo } from '../models/cliente';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private clientes$= new Subject<Cliente[]>();

  private clientes:Cliente[];
  private grupos:Grupo[];

  constructor() { 
    this.grupos=[{
      id:0,
      nombre:'Undefined'
    },
    {
      id:1,
      nombre:'Activos'
    },
    {
      id:2,
      nombre:'Inactivos'
    },
    {
      id:3,
      nombre:'Deudores'
    }
    ];
    this.clientes=[];
  }
  getGrupos(){
    return this.grupos;
  }
  getClientes(){
    return this.clientes;
  }
  getClientes$():Observable<Cliente[]>{
    return this.clientes$.asObservable();
  }
  agregarCliente(cliente:Cliente){
    this.clientes.push(cliente);
    this.clientes$.next(this.clientes);
  }
  nuevoCliente():Cliente{
    return{
      id:this.clientes.length,
      nombre:'',
      direccion:'',
      grupo:0
    };
  }
}
