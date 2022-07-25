import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/pokemon';

@Component({
  selector: 'app-add-pokemon',
  template: `
    <h2 class="center">Ajouter un pokemon</h2>
    <app-pokemon-form [pokemon]="pokemon"></app-pokemon-form>

  `
})
export class AddPokemonComponent implements OnInit {
  pokemon : Pokemon
  constructor() { 

  }

  ngOnInit(): void {
    this.pokemon = new Pokemon   
  }

}
