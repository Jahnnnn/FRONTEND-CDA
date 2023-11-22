import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Carnet } from '../model/Carnet';  

@Injectable({
  providedIn: 'root'
})
export class CarnetService {

  private apiUrl = 'http://localhost:2023/carnet'; // Reemplaza con la URL de tu API

  private carnetsSubject: BehaviorSubject<Carnet[]> = new BehaviorSubject<Carnet[]>([]);
  carnets$: Observable<Carnet[]> = this.carnetsSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Método para cargar los carnets desde el API
  cargarCarnets(): void {
    this.http.get<Carnet[]>(this.apiUrl + '/all')
      .pipe(
        tap(carnets => this.carnetsSubject.next(carnets)),
        catchError(error => {
          console.error('Error al cargar los carnets', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para agregar un carnet
  agregarCarnet(carnet: Carnet): void {
    this.http.post<Carnet>(this.apiUrl + '/add', carnet)
      .pipe(
        tap(nuevoCarnet => this.carnetsSubject.next([...this.carnetsSubject.value, nuevoCarnet])),
        catchError(error => {
          console.error('Error al agregar el carnet', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para actualizar un carnet
  actualizarCarnet(id: string, carnetActualizado: Carnet): void {
    const url = `${this.apiUrl}/update?id=${id}`;
    this.http.post<Carnet>(url, carnetActualizado)
      .pipe(
        tap(() => {
          const carnets = this.carnetsSubject.value;
          const indice = carnets.findIndex(carnet => carnet.id === id);
          carnets[indice] = carnetActualizado;
          this.carnetsSubject.next(carnets);
        }),
        catchError(error => {
          console.error('Error al actualizar el carnet', error);
          throw error;
        })
      )
      .subscribe();
  }

  // Método para eliminar un carnet
  eliminarCarnet(id: string): void {
    const url = `${this.apiUrl}/delete?id=${id}`;
    this.http.delete(url)
      .pipe(
        tap(() => {
          const carnets = this.carnetsSubject.value.filter(carnet => carnet.id !== id);
          this.carnetsSubject.next(carnets);
        }),
        catchError(error => {
          console.error('Error al eliminar el carnet', error);
          throw error;
        })
      )
      .subscribe();
  }

  obtenerCarnetPorId(id: string): Observable<Carnet> {
    const url = `${this.apiUrl}/id?id=${id}`;
    return this.http.get<Carnet>(url)
      .pipe(
        catchError(error => {
          console.error('Error al obtener el carnet por ID', error);
          throw error;
        })
      );
  }
}
