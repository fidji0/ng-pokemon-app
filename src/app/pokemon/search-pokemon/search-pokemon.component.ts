import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Pokemon } from 'src/app/pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',

})
export class SearchPokemonComponent implements OnInit {
  // flux de donnée de recherche
  searchterms = new Subject<string>()
  pokemons$: Observable<Pokemon[]>

  constructor(private pokemonService: PokemonService,
    private router: Router) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchterms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.pokemonService.searchPokemonList(term))

    )
  }
  search(term: string) {
    this.searchterms.next(term)
  }
  goToDetailPokemon(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id]
    this.router.navigate(link)
  }
}
