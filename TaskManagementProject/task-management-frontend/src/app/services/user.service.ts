import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  // Create a BehaviorSubject to store the current user login state and username
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private userNameSubject = new BehaviorSubject<string>('');

  // Observable for components to subscribe to
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  userName$ = this.userNameSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { username, password });
  }

  register(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, { username, password });
  }

  logout(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout/${userId}`, {});
  }

  getUserInfo(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  // Method to update login state
  setLoggedInState(isLoggedIn: boolean, userName: string = '') {
    this.isLoggedInSubject.next(isLoggedIn);
    this.userNameSubject.next(userName);
  }
}
