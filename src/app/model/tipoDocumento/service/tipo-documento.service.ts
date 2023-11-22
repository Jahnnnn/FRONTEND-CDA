import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TipoDocumento } from '../model/TipoDocumento';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  private apiUrl = 'http://localhost:2023/tipo-documento'; // Reemplaza con la URL de tu API

  private tiposDocumentoSubject: BehaviorSubject<TipoDocumento[]> = new BehaviorSubject<TipoDocumento[]>([]);
  tiposDocumento$: Observable<TipoDocumento[]> = this.tiposDocumentoSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Método para cargar los tipos de documento desde el API
  cargarTiposDocumento(): void {
    this.http.get<TipoDocumento[]>(this.apiUrl + '/all')
      .pipe(
        tap(tiposDocumento => this.tiposDocumentoSubject.next(tiposDocumento)),
        catchError(error => {
          console.error('Error al cargar los tipos de documento', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para agregar un tipo de documento
  agregarTipoDocumento(tipoDocumento: TipoDocumento): void {
    this.http.post<TipoDocumento>(this.apiUrl + '/add', tipoDocumento)
      .pipe(
        tap(nuevo => this.tiposDocumentoSubject.next([...this.tiposDocumentoSubject.value, nuevo])),
        catchError(error => {
          console.error('Error al agregar el tipo de documento', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para actualizar un tipo de documento
  actualizarTipoDocumento(id: string, actualizado: TipoDocumento): void {
    const url = `${this.apiUrl}/update?id=${id}`;
    this.http.post<TipoDocumento>(url, actualizado)
      .pipe(
        tap(() => {
          const tiposDocumento = this.tiposDocumentoSubject.value;
          const indice = tiposDocumento.findIndex(tipoDocumento => tipoDocumento.id === id);
          tiposDocumento[indice] = actualizado;
          this.tiposDocumentoSubject.next(tiposDocumento);
        }),
        catchError(error => {
          console.error('Error al actualizar el tipo de documento', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para eliminar un tipo de documento
  eliminarTipoDocumento(id: string): void {
    const url = `${this.apiUrl}/delete?id=${id}`;
    this.http.delete(url)
      .pipe(
        tap(() => {
          const tiposDocumento = this.tiposDocumentoSubject.value.filter(tipoDocumento => tipoDocumento.id !== id);
          this.tiposDocumentoSubject.next(tiposDocumento);
        }),
        catchError(error => {
          console.error('Error al eliminar el tipo de documento', error);
          throw error;
        })
      )
      .subscribe();
  }

  obtenerTipoDocumentoPorId(id: string): Observable<TipoDocumento> {
    const url = `${this.apiUrl}/id?id=${id}`;
    return this.http.get<TipoDocumento>(url)
      .pipe(
        catchError(error => {
          console.error('Error al obtener el tipo de documento por ID', error);
          throw error;
        })
      );
  }
}
