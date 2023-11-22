import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Bloque } from '../model/Bloque';

@Injectable({
  providedIn: 'root'
})
export class BloqueService {

  private apiUrl = 'http://localhost:2023/bloque'; // Reemplaza con la URL de tu API

  private bloquesSubject: BehaviorSubject<Bloque[]> = new BehaviorSubject<Bloque[]>([]);
  bloques$: Observable<Bloque[]> = this.bloquesSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Método para cargar los bloques desde el API
  cargarBloques(): void {
    this.http.get<Bloque[]>(this.apiUrl + '/all')
      .pipe(
        tap(bloques => this.bloquesSubject.next(bloques)),
        catchError(error => {
          console.error('Error al cargar bloques', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para agregar un bloque
  agregarBloque(bloque: Bloque): void {
    this.http.post<Bloque>(this.apiUrl + '/add', bloque)
      .pipe(
        tap(nuevoBloque => this.bloquesSubject.next([...this.bloquesSubject.value, nuevoBloque])),
        catchError(error => {
          console.error('Error al agregar bloque', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para actualizar un bloque
  actualizarBloque(id: string, bloqueActualizado: Bloque): void {
    const url = `${this.apiUrl}/update?id=${id}`;
    this.http.post<Bloque>(url, bloqueActualizado)
      .pipe(
        tap(() => {
          const bloques = this.bloquesSubject.value;
          const indice = bloques.findIndex(bloque => bloque.id === id);
          bloques[indice] = bloqueActualizado;
          this.bloquesSubject.next(bloques);
        }),
        catchError(error => {
          console.error('Error al actualizar bloque', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para eliminar un bloque
  eliminarBloque(id: string): void {
    const url = `${this.apiUrl}/delete?id=${id}`;
    this.http.delete(url)
      .pipe(
        tap(() => {
          const bloques = this.bloquesSubject.value.filter(bloque => bloque.id !== id);
          this.bloquesSubject.next(bloques);
        }),
        catchError(error => {
          console.error('Error al eliminar bloque', error);
          throw error;
        })
      )
      .subscribe();
  }

  obtenerBloquePorId(id: string): Observable<Bloque> {
    const url = `${this.apiUrl}/id?id=${id}`;
    return this.http.get<Bloque>(url)
      .pipe(
        catchError(error => {
          console.error('Error al obtener bloque por ID', error);
          throw error;
        })
      );
  }
  
}
