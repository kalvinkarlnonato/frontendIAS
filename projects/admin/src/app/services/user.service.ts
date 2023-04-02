import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  addUser(data: User): Observable<User> {
    return this.http.post<User>('http://localhost:3500/user/add', data);
  }

  getUserAll(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3500/user/all', httpOptions);
  }

  updateUser(id: number, data: any): Observable<User> {
    return this.http.put<User>(`http://localhost:3500/user/edit/${id}`, data);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`http://localhost:3500/user/delete/${id}`);
  }
}
