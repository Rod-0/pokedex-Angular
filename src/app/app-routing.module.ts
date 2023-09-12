import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokeTableComponent} from "./components/poke-table/poke-table.component";
import {PokeDetailComponent} from "./components/poke-detail/poke-detail.component";

const routes: Routes = [
  { path: 'home', component: PokeTableComponent },
  { path: 'pokemon/:id', component: PokeDetailComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
