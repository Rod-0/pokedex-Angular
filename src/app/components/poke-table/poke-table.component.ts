import {Component, ViewChild} from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";


@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.css']
})
export class PokeTableComponent {
  displayedColumns: string[] = ['position', 'image', 'name', 'move'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  pokemon = [];

  constructor(private pokemonService: PokemonService, private router: Router) {

  }

  ngOnInit() {

    this.getPokemon();
  }

  getPokemon() {
    let pokemonData;
    for (let i = 1; i <= 151; i++) {
      this.pokemonService.getPokemon(i)
        .subscribe(
          (res:any) => {
            pokemonData = {
              position: i,
              image: res.sprites.front_default,
              name: res.name,
              move: res.moves[0].move.name
            };
            this.data.push(pokemonData);
            this.dataSource = new MatTableDataSource<any>(this.data);
            this.dataSource.paginator = this.paginator;
          },
          err => {
            console.log(err);
          }
        );

    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRow(row: any) {
    console.log(row);
    this.router.navigateByUrl(`/pokemon/${row.position}`);
  }

}
