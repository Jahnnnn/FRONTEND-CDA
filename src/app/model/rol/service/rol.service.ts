import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Rol } from '../model/Rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private apiUrl = 'http://localhost:2023/rol'; // Reemplaza con la URL de tu API

  private rolesSubject: BehaviorSubject<Rol[]> = new BehaviorSubject<Rol[]>([]);
  roles$: Observable<Rol[]> = this.rolesSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Método para cargar los roles desde el API
  cargarRoles(): void {
    this.http.get<Rol[]>(this.apiUrl + '/all')
      .pipe(
        tap(roles => this.rolesSubject.next(roles)),
        catchError(error => {
          console.error('Error al cargar los roles', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para agregar un rol
  agregarRol(rol: Rol): void {
    this.http.post<Rol>(this.apiUrl + '/add', rol)
      .pipe(
        tap(nuevo => this.rolesSubject.next([...this.rolesSubject.value, nuevo])),
        catchError(error => {
          console.error('Error al agregar el rol', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para actualizar un rol
  actualizarRol(id: string, actualizado: Rol): void {
    const url = `${this.apiUrl}/update?id=${id}`;
    this.http.post<Rol>(url, actualizado)
      .pipe(
        tap(() => {
          const roles = this.rolesSubject.value;
          const indice = roles.findIndex(rol => rol.id === id);
          roles[indice] = actualizado;
          this.rolesSubject.next(roles);
        }),
        catchError(error => {
          console.error('Error al actualizar el rol', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para eliminar un rol
  eliminarRol(id: string): void {
    const url = `${this.apiUrl}/delete?id=${id}`;
    this.http.delete(url)
      .pipe(
        tap(() => {
          const roles = this.rolesSubject.value.filter(rol => rol.id !== id);
          this.rolesSubject.next(roles);
        }),
        catchError(error => {
          console.error('Error al eliminar el rol', error);
          throw error;
        })
      )
      .subscribe();
  }

  obtenerRolPorId(id: string): Observable<Rol> {
    const url = `${this.apiUrl}/id?id=${id}`;
    return this.http.get<Rol>(url)
      .pipe(
        catchError(error => {
          console.error('Error al obtener el rol por ID', error);
          throw error;
        })
      );
  }
}
