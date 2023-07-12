import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';

import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  // metodo que usaremospara obtener el usuario que esta actualmente logeado
  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return { ...this.user };
  }


  // metodo que usaremos para autenticar al usuario
  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => { this.user = user; }),
        tap(user => localStorage.setItem('token', user.id.toString())));
  };

  logOut() {
    this.user = undefined;
    localStorage.clear();
  }
}
