import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Cargo } from '../model/Cargo';  


@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private apiUrl = 'http://localhost:2023/cargo'; // Reemplaza con la URL de tu API

  private cargosSubject: BehaviorSubject<Cargo[]> = new BehaviorSubject<Cargo[]>([]);
  cargos$: Observable<Cargo[]> = this.cargosSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Método para cargar los cargos desde el API
  cargarCargos(): void {
    this.http.get<Cargo[]>(this.apiUrl + '/all')
      .pipe(
        tap(cargos => this.cargosSubject.next(cargos)),
        catchError(error => {
          console.error('Error al cargar los cargos', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para agregar un cargo
  agregarCargo(cargo: Cargo): void {
    this.http.post<Cargo>(this.apiUrl + '/add', cargo)
      .pipe(
        tap(nuevoCargo => this.cargosSubject.next([...this.cargosSubject.value, nuevoCargo])),
        catchError(error => {
          console.error('Error al agregar el cargo', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para actualizar un cargo
  actualizarCargo(id: string, cargoActualizado: Cargo): void {
    const url = `${this.apiUrl}/update?id=${id}`;
    this.http.post<Cargo>(url, cargoActualizado)
      .pipe(
        tap(() => {
          const cargos = this.cargosSubject.value;
          const indice = cargos.findIndex(cargo => cargo.id === id);
          cargos[indice] = cargoActualizado;
          this.cargosSubject.next(cargos);
        }),
        catchError(error => {
          console.error('Error al actualizar el cargo', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para eliminar un cargo
  eliminarCargo(id: string): void {
    const url = `${this.apiUrl}/delete?id=${id}`;
    this.http.delete(url)
      .pipe(
        tap(() => {
          const cargos = this.cargosSubject.value.filter(cargo => cargo.id !== id);
          this.cargosSubject.next(cargos);
        }),
        catchError(error => {
          console.error('Error al eliminar el cargo', error);
          throw error;
        })
      )
      .subscribe();
  }

  obtenerCargoPorId(id: string): Observable<Cargo> {
    const url = `${this.apiUrl}/id?id=${id}`;
    return this.http.get<Cargo>(url)
      .pipe(
        catchError(error => {
          console.error('Error al obtener el cargo por ID', error);
          throw error;
        })
      );
  }
}
