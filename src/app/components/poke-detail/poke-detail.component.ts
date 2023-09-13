import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.css']
})
export class PokeDetailComponent implements OnInit {

  pokemon: any = '';
  pokemonAbilities = [];
  pokemonImage ='';

  ngOnInit(): void {
  }

  constructor(private PokemonService: PokemonService, private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params.subscribe(
      params => {
        this.getPokemon(params['id']);
      }
    );
  }

  getPokemon(id: any){
    this.PokemonService.getPokemon(id).subscribe(
      (res:any) =>
      {
        console.log(res);
        this.pokemon = res;
        this.pokemonImage = this.pokemon.sprites.front_shiny;
        this.pokemonAbilities = res.abilities[0].ability.name;

      },
      err =>{
        console.log(err);
      }
    );
  }

}
