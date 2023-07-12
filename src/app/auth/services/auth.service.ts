import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, flatMap, map, of, tap } from 'rxjs';

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

  // metodo que usaremos para checkear que el usuario este autenticado
  checkAutentication(): Observable<boolean> {

    // comprobaremos si en el local storage existe algun token
    if (!localStorage.getItem('toke')) return of(false);

    const token = localStorage.getItem('toke')

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        // estamos comprobando si el usuario tiene un valor
        map(user => !!user),
        catchError(err => of(false))
      )
  }


  // metodo que usaremos para deslogear al usuario
  logOut() {
    this.user = undefined;
    localStorage.clear();
  }
}
