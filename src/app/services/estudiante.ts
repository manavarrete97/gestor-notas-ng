import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private API_URL = '/api/Estudiante';

  constructor(private http: HttpClient) { }

  getEstudiantes(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  getEstudiante(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}?id=${id}`);
  }

  addEstudiante(estudiante: any): Observable<any> {
    return this.http.post(this.API_URL, estudiante, { responseType: 'text' });
  }

  updateEstudiante(estudiante: any): Observable<any> {
    return this.http.put(this.API_URL, estudiante, { responseType: 'text' });
  }

  deleteEstudiante(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}?id=${id}`, { responseType: 'text' });
  }
}
