import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  private API_URL = '/api/Nota';

  constructor(private http: HttpClient) { }

  getNota(idEstudiante: number, idMateria: number): Observable<any> {
    return this.http.get(`${this.API_URL}?idEstudiante=${idEstudiante}&idMateria=${idMateria}`);
  }

  addNota(nota: any): Observable<any> {
    return this.http.post(this.API_URL, nota, { responseType: 'text' });
  }

  updateNota(idNota: number, idProfesor: number, valor: number): Observable<any> {
    return this.http.put(`${this.API_URL}?idNota=${idNota}&idProfesor=${idProfesor}`, valor, { responseType: 'text' });
  }

  deleteNota(idNota: number, idProfesor: number): Observable<any> {
    return this.http.delete(`${this.API_URL}?idNota=${idNota}&idProfesor=${idProfesor}`, { responseType: 'text' });
  }
}
