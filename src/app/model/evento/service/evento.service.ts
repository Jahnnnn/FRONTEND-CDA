import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Evento } from '../model/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private apiUrl = 'http://localhost:2023/evento'; // Reemplaza con la URL de tu API

  private eventosSubject: BehaviorSubject<Evento[]> = new BehaviorSubject<Evento[]>([]);
  eventos$: Observable<Evento[]> = this.eventosSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Método para cargar los contactos desde el API
  cargarEventos(): void {
    this.http.get<Evento[]>(this.apiUrl + '/all')
      .pipe(
        tap(contactos => this.eventosSubject.next(contactos)),
        catchError(error => {
          console.error('Error al cargar los contactos', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para agregar un contacto
  agregarEvento(contacto: Evento): void {
    this.http.post<Evento>(this.apiUrl + '/add', contacto)
      .pipe(
        tap(nuevo => this.eventosSubject.next([...this.eventosSubject.value, nuevo])),
        catchError(error => {
          console.error('Error al agregar el contacto', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para actualizar un contacto
  actualizarEvento(id: string, actualizado: Evento): void {
    const url = `${this.apiUrl}/update?id=${id}`;
    this.http.post<Evento>(url, actualizado)
      .pipe(
        tap(() => {
          const contactos = this.eventosSubject.value;
          const indice = contactos.findIndex(contacto => contacto.id === id);
          contactos[indice] = actualizado;
          this.eventosSubject.next(contactos);
        }),
        catchError(error => {
          console.error('Error al actualizar el contacto', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para eliminar un contacto
  eliminarEvento(id: string): void {
    const url = `${this.apiUrl}/delete?id=${id}`;
    this.http.delete(url)
      .pipe(
        tap(() => {
          const contactos = this.eventosSubject.value.filter(contacto => contacto.id !== id);
          this.eventosSubject.next(contactos);
        }),
        catchError(error => {
          console.error('Error al eliminar el contacto', error);
          throw error;
        })
      )
      .subscribe();
  }

  obtenerEventoPorId(id: string): Observable<Evento> {
    const url = `${this.apiUrl}/id?id=${id}`;
    return this.http.get<Evento>(url)
      .pipe(
        catchError(error => {
          console.error('Error al obtener el contacto por ID', error);
          throw error;
        })
      );
  }
}
