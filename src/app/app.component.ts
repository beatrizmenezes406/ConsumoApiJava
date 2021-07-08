import { Component, OnInit } from '@angular/core';
import { ClienteService } from './services/cliente.service';
import { Cliente } from './models/cliente';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  cliente = {} as Cliente;
  clientes: Cliente[];

  constructor(private clienteService: ClienteService) {
    this.clientes = [];
  }
  
  ngOnInit() {
    this.listaClientes();
  }

  addCliente(form: NgForm) {
    if (this.cliente.id !== undefined) {
      this.clienteService.atualizaCliente(this.cliente).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.clienteService.addClientes(this.cliente).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  listaClientes() {
    this.clienteService.listaClientes().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
    });
  }
  removeClientes(cliente: Cliente) {
    this.clienteService.removeCliente(cliente).subscribe(() => {
      this.listaClientes();
    });
  }

  editaCliente(cliente: Cliente) {
    this.cliente = { ...cliente };
  }

  cleanForm(form: NgForm) {
    this.listaClientes();
    form.resetForm();
    this.cliente = {} as Cliente;
  }

}

