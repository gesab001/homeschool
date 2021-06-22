import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {QuizComponent} from './quiz/quiz.component';

const routes: Routes = [
   {path: 'homepage/:subject/:year', component: HomepageComponent},
   {path: 'quiz/:subject/:title/:topic/:subjectletter/:year/:letter/:number', component: QuizComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
