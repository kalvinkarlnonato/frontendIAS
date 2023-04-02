import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inspection } from '../models/inspection.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class InspectionService {

  constructor(private http: HttpClient) { }
  addInspection(data: Inspection): Observable<Inspection> {
    return this.http.post<Inspection>('http://localhost:3500/inspection/add', data);
  }

  getInspectionAll(): Observable<Inspection[]> {
    return this.http.get<Inspection[]>('http://localhost:3500/inspection/all', httpOptions);
  }

  updateInspection(id: number, data: any): Observable<Inspection> {
    return this.http.put<Inspection>(`http://localhost:3500/inspection/edit/${id}`, data);
  }

  deleteInspection(id: number): Observable<Inspection> {
    return this.http.delete<Inspection>(`http://localhost:3500/inspection/delete/${id}`);
  }
}
