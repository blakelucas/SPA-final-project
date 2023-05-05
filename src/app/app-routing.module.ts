import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaygroundComponent } from './playground/playground.component';
import { PlinkoComponent } from './plinko/plinko.component';
import { BirdsComponent } from './birds/birds.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'playground', component: PlaygroundComponent },
  { path: 'plinko', component: PlinkoComponent },
  { path: 'birds', component: BirdsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
