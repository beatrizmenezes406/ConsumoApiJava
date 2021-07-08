import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = 'http://localhost:8080/clientes';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  listaClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  addClientes(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.url, JSON.stringify(cliente), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  atualizaCliente(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.put<Cliente>(this.url, JSON.stringify(cliente), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  removeCliente(cliente: Cliente) {
    return this.httpClient.delete<Cliente>(this.url + '/' + cliente.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
 }

}
