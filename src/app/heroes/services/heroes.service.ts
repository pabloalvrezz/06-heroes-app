import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, of } from 'rxjs'
import { Hero } from '../interfaces/hero.interface';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // metodo que usaremos para obtener el heroe en base a una peticion http
  getHeroes(): Observable<Hero[]> {

    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`)
  }

  // metodo que usaremos para obtener el heroe en base a su id
  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(error => of(undefined))
      )
  }

}
