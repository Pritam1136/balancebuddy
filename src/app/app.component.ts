import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddWorkoutComponent } from './add-workout/add-workout.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutListComponent } from './workout-list/workout-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AddWorkoutComponent,
    CommonModule,
    FormsModule,
    WorkoutListComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {}
