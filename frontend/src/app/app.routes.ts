import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';

export const routes: Routes = [
    {path: "", redirectTo:"/home", pathMatch: 'full'},
    {path: "home", component: HomeComponent},
    {path: "details/:slug", component: GameDetailsComponent}
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled', // <-- ESSENCIAL
  anchorScrolling: 'enabled',           // (opcional para #ancoras)
  scrollOffset: [0, 0],                 // (opcional: deslocamento fixo)
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }