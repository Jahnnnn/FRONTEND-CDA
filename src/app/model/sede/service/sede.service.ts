import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Sede } from '../model/Sede';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  private apiUrl = 'http://localhost:2023/sede'; // Reemplaza con la URL de tu API

  private sedesSubject: BehaviorSubject<Sede[]> = new BehaviorSubject<Sede[]>([]);
  sedes$: Observable<Sede[]> = this.sedesSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Método para cargar las sedes desde el API
  cargarSedes(): void {
    this.http.get<Sede[]>(this.apiUrl + '/all')
      .pipe(
        tap(sedes => this.sedesSubject.next(sedes)),
        catchError(error => {
          console.error('Error al cargar las sedes', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para agregar una sede
  agregarSede(sede: Sede): void {
    this.http.post<Sede>(this.apiUrl + '/add', sede)
      .pipe(
        tap(nuevaSede => this.sedesSubject.next([...this.sedesSubject.value, nuevaSede])),
        catchError(error => {
          console.error('Error al agregar la sede', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para actualizar una sede
  actualizarSede(id: string, sedeActualizada: Sede): void {
    const url = `${this.apiUrl}/update?id=${id}`;
    this.http.post<Sede>(url, sedeActualizada)
      .pipe(
        tap(() => {
          const sedes = this.sedesSubject.value;
          const indice = sedes.findIndex(sede => sede.id === id);
          sedes[indice] = sedeActualizada;
          this.sedesSubject.next(sedes);
        }),
        catchError(error => {
          console.error('Error al actualizar la sede', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para eliminar una sede
  eliminarSede(id: string): void {
    const url = `${this.apiUrl}/delete?id=${id}`;
    this.http.delete(url)
      .pipe(
        tap(() => {
          const sedes = this.sedesSubject.value.filter(sede => sede.id !== id);
          this.sedesSubject.next(sedes);
        }),
        catchError(error => {
          console.error('Error al eliminar la sede', error);
          throw error;
        })
      )
      .subscribe();
  }

  obtenerSedePorId(id: string): Observable<Sede> {
    const url = `${this.apiUrl}/id?id=${id}`;
    return this.http.get<Sede>(url)
      .pipe(
        catchError(error => {
          console.error('Error al obtener la sede por ID', error);
          throw error;
        })
      );
  }
}
