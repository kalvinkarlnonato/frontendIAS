import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../models/member.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class MemberService {

  constructor(private http: HttpClient) { }
  addMember(data: Member): Observable<Member> {
    return this.http.post<Member>('http://localhost:3500/team', data);
  }

  getMemberAll(): Observable<Member[]> {
    return this.http.get<Member[]>('http://localhost:3500/team/all');
  }

  updateMember(id: number, data: any): Observable<Member> {
    return this.http.put<Member>(`http://localhost:3500/team/${id}`, data);
  }

  deleteMember(id: number): Observable<Member> {
    return this.http.delete<Member>(`http://localhost:3500/team/${id}`);
  }
}
