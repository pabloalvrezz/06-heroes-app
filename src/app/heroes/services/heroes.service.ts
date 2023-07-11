import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, of } from 'rxjs'
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

  // metodo que usaremos para hacer las sugerencias segun las letras que el usuario vaya escribiendo
  // a la hora de buscar un heroe
  getSuggestions(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`)
  }

  // metodo que usaremos para añadir un heroe
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  // metodo que usaremos para actualizar un heroe
  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error("Hero id is required");

    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  // metodo que usaremos para eliminar un heroe por su id
  deleteHeroById(id: String): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        map(resp => true),
        catchError(err => of(false)),
      )
  }
}
