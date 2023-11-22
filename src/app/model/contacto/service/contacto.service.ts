import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Contacto } from '../model/Contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private apiUrl = 'http://localhost:2023/contacto'; // Reemplaza con la URL de tu API

  private contactosSubject: BehaviorSubject<Contacto[]> = new BehaviorSubject<Contacto[]>([]);
  contactos$: Observable<Contacto[]> = this.contactosSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Método para cargar los contactos desde el API
  cargarContactos(): void {
    this.http.get<Contacto[]>(this.apiUrl + '/all')
      .pipe(
        tap(contactos => this.contactosSubject.next(contactos)),
        catchError(error => {
          console.error('Error al cargar los contactos', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para agregar un contacto
  agregarContacto(contacto: Contacto): void {
    this.http.post<Contacto>(this.apiUrl + '/add', contacto)
      .pipe(
        tap(nuevo => this.contactosSubject.next([...this.contactosSubject.value, nuevo])),
        catchError(error => {
          console.error('Error al agregar el contacto', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para actualizar un contacto
  actualizarContacto(id: string, actualizado: Contacto): void {
    const url = `${this.apiUrl}/update?id=${id}`;
    this.http.post<Contacto>(url, actualizado)
      .pipe(
        tap(() => {
          const contactos = this.contactosSubject.value;
          const indice = contactos.findIndex(contacto => contacto.id === id);
          contactos[indice] = actualizado;
          this.contactosSubject.next(contactos);
        }),
        catchError(error => {
          console.error('Error al actualizar el contacto', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para eliminar un contacto
  eliminarContacto(id: string): void {
    const url = `${this.apiUrl}/delete?id=${id}`;
    this.http.delete(url)
      .pipe(
        tap(() => {
          const contactos = this.contactosSubject.value.filter(contacto => contacto.id !== id);
          this.contactosSubject.next(contactos);
        }),
        catchError(error => {
          console.error('Error al eliminar el contacto', error);
          throw error;
        })
      )
      .subscribe();
  }

  obtenerContactoPorId(id: string): Observable<Contacto> {
    const url = `${this.apiUrl}/id?id=${id}`;
    return this.http.get<Contacto>(url)
      .pipe(
        catchError(error => {
          console.error('Error al obtener el contacto por ID', error);
          throw error;
        })
      );
  }
}
