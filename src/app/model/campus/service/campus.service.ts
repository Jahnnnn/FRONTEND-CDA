import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Campus } from '../model/Campus'; 

@Injectable({
  providedIn: 'root'
})
export class CampusService {

  private apiUrl = 'http://localhost:2023/campus'; // Reemplaza con la URL de tu API

  private campusesSubject: BehaviorSubject<Campus[]> = new BehaviorSubject<Campus[]>([]);
  campuses$: Observable<Campus[]> = this.campusesSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Método para cargar los campus desde el API
  cargarCampuses(): void {
    this.http.get<Campus[]>(this.apiUrl + '/all')
      .pipe(
        tap(campuses => this.campusesSubject.next(campuses)),
        catchError(error => {
          console.error('Error al cargar los campus', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para agregar un campus
  agregarCampus(campus: Campus): void {
    this.http.post<Campus>(this.apiUrl + '/add', campus)
      .pipe(
        tap(nuevoCampus => this.campusesSubject.next([...this.campusesSubject.value, nuevoCampus])),
        catchError(error => {
          console.error('Error al agregar el campus', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para actualizar un campus
  actualizarCampus(id: string, campusActualizado: Campus): void {
    const url = `${this.apiUrl}/update?id=${id}`;
    this.http.post<Campus>(url, campusActualizado)
      .pipe(
        tap(() => {
          const campuses = this.campusesSubject.value;
          const indice = campuses.findIndex(campus => campus.id === id);
          campuses[indice] = campusActualizado;
          this.campusesSubject.next(campuses);
        }),
        catchError(error => {
          console.error('Error al actualizar el campus', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para eliminar un campus
  eliminarCampus(id: string): void {
    const url = `${this.apiUrl}/delete?id=${id}`;
    this.http.delete(url)
      .pipe(
        tap(() => {
          const campuses = this.campusesSubject.value.filter(campus => campus.id !== id);
          this.campusesSubject.next(campuses);
        }),
        catchError(error => {
          console.error('Error al eliminar el campus', error);
          throw error;
        })
      )
      .subscribe();
  }

  obtenerCampusPorId(id: string): Observable<Campus> {
    const url = `${this.apiUrl}/id?id=${id}`;
    return this.http.get<Campus>(url)
      .pipe(
        catchError(error => {
          console.error('Error al obtener el campus por ID', error);
          throw error;
        })
      );
  }
}
