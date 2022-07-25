import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pokemon } from '../pokemon';


@Injectable()
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((pokemonList) => this.log(pokemonList)),
      catchError((error) => this.handleError(error, [])
      )
    )
  }
  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOption = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOption).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null)
      )
    )
  }

  searchPokemonList(term: string): Observable<Pokemon[]> {
    if (term.length <= 1) {
      return of([])
    } else {
      return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
        tap((pokemonList) => this.log(pokemonList)),
        catchError((error) => this.handleError(error, [])
        )
      )
    }
  }
  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((pokemon) => this.log(pokemon)),
      catchError((error) => this.handleError(error, undefined)
      )
    )
  }
  updatePokemon(pokemon: Pokemon): Observable<null> {
    const httpOption = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.put('api/pokemons', pokemon, httpOption).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    )
  }
  deletePokemonById(pokemonId: number): Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    )
  }

  private handleError(error: Error, errorValue: any | undefined) {
    console.error(error);
    return of(errorValue)

  }

  private log(response: any) {
    console.table(response)
  }

  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Poison',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Vol',
      'Electrik',
      'Fée',
      'Psy',
      'Glace',
      'Combat'
    ]
  }
}
