import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Programa } from '../model/Programa';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  private apiUrl = 'http://localhost:2023/programa'; // Reemplaza con la URL de tu API

  private programasSubject: BehaviorSubject<Programa[]> = new BehaviorSubject<Programa[]>([]);
  programas$: Observable<Programa[]> = this.programasSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Método para cargar los programas desde el API
  cargarProgramas(): void {
    this.http.get<Programa[]>(this.apiUrl + '/all')
      .pipe(
        tap(programas => this.programasSubject.next(programas)),
        catchError(error => {
          console.error('Error al cargar los programas', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para agregar un programa
  agregarPrograma(carnet: Programa): void {
    this.http.post<Programa>(this.apiUrl + '/add', carnet)
      .pipe(
        tap(nuevo => this.programasSubject.next([...this.programasSubject.value, nuevo])),
        catchError(error => {
          console.error('Error al agregar el programa', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para actualizar un programa
  actualizarPrograma(id: string, actualizado: Programa): void {
    const url = `${this.apiUrl}/update?id=${id}`;
    this.http.post<Programa>(url, actualizado)
      .pipe(
        tap(() => {
          const programas = this.programasSubject.value;
          const indice = programas.findIndex(programa => programa.id === id);
          programas[indice] = actualizado;
          this.programasSubject.next(programas);
        }),
        catchError(error => {
          console.error('Error al actualizar el programa', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para eliminar un programa
  eliminarPrograma(id: string): void {
    const url = `${this.apiUrl}/delete?id=${id}`;
    this.http.delete(url)
      .pipe(
        tap(() => {
          const programas = this.programasSubject.value.filter(programa => programa.id !== id);
          this.programasSubject.next(programas);
        }),
        catchError(error => {
          console.error('Error al eliminar el programa', error);
          throw error;
        })
      )
      .subscribe();
  }

  obtenerProgramaPorId(id: string): Observable<Programa> {
    const url = `${this.apiUrl}/id?id=${id}`;
    return this.http.get<Programa>(url)
      .pipe(
        catchError(error => {
          console.error('Error al obtener el programa por ID', error);
          throw error;
        })
      );
  }
}
