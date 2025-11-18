import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private apiUrl = '/api/Profesor';

  constructor(private http: HttpClient) { }

  getProfesores(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addProfesor(profesor: any): Observable<any> {
    return this.http.post(this.apiUrl, profesor, { responseType: 'text' });
  }

  updateProfesor(profesor: any): Observable<any> {
    return this.http.put(this.apiUrl, profesor, { responseType: 'text' });
  }

  deleteProfesor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?id=${id}`, { responseType: 'text' });
  }
}
