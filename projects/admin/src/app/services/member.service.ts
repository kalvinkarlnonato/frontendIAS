import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class MemberService {

  constructor(private http: HttpClient) { }
  addMember(data: any): Observable<any> {
    return this.http.post('http://localhost:3500/team', data);
  }

  getMemberAll(): Observable<any> {
    return this.http.get('http://localhost:3500/team/all');
  }

  updateMember(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3500/team/${id}`, data);
  }

  deleteMember(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3500/team/${id}`);
  }
}
