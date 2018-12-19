import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  MatButtonModule, 
  MatInputModule, 
  MatCardModule,
  MatToolbarModule, 
  MatListModule,
  MatSelectModule} from '@angular/material'


import { AppComponent } from './app.component'
import { NavComponent } from './nav/nav.component'
import { HomeComponent } from './home/home.component'
import { ApiService } from './services/api.services';
import { PlayersComponent } from './players/players.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayerComponent } from './players/player.component';
import { ModalService } from './services/modal.service';
import { ModalComponent } from './_directives/modal.component';

const routes = [
   {path: "", component: HomeComponent},
   {path: "player", component: PlayerComponent},
   {path: "player/:playerId", component: PlayerComponent}
  // {path: "question/:quizId", component: QuestionComponent},
  // {path: "register", component: RegisterComponent},
  // {path: "login", component: LoginComponent},
  // {path: "quiz", component: QuizComponent},
  // {path: "play", component: PlayComponent}
];

@NgModule({
  declarations: [
    AppComponent, NavComponent, HomeComponent, PlayersComponent, PlayerComponent, ModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, HttpClientModule, 
    RouterModule.forRoot(routes),FormsModule, 
    ReactiveFormsModule,
    MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatListModule,
    MatSelectModule
  ],
  providers: [ApiService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
