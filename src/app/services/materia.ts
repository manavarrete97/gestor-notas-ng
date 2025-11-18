import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  private API_URL = '/api/Materia';

  constructor(private http: HttpClient) { }

  getMaterias(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  getMateria(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}?id=${id}`);
  }

  addMateria(materia: any): Observable<any> {
    return this.http.post(this.API_URL, materia, { responseType: 'text' });
  }

  updateMateria(materia: any): Observable<any> {
    return this.http.put(this.API_URL, materia, { responseType: 'text' });
  }

  deleteMateria(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}?id=${id}`, { responseType: 'text' });
  }
}
