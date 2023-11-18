import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../clientes.service';
import { Cliente, Grupo } from 'src/app/models/cliente';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.component.html',
  styleUrls: ['./alta-cliente.component.css']
})
export class AltaClienteComponent implements OnInit{
  cliente!:Cliente;
  grupos:Grupo[] | undefined;
  clientes$!: Observable<Cliente[]>;
  clientes:Cliente[]=[];
  clientesSubscription: Subscription=new Subscription;
  constructor(private clientesService: ClientesService){

  }
  ngOnInit(): void {
    this.cliente=this.clientesService.nuevoCliente();
    this.grupos=this.clientesService.getGrupos();
    this.clientes$=this.clientesService.getClientes$();
    this.clientes$.subscribe(clientes=>this.clientes=clientes)
    this.clientesSubscription=this.clientes$.subscribe(clientes=>this.clientes=clientes);
  }
  ngOnDestroy():void{
    this.clientesSubscription.unsubscribe();
  }
  nuevoCliente():void{
    this.clientesService.agregarCliente(this.cliente);
    this.cliente=this.clientesService.nuevoCliente();
  }

}
