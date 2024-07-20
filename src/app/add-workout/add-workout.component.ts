import { Component } from '@angular/core';
import { Workout } from '../data/workout.model';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
})
export class AddWorkoutComponent {
  workout: Workout = { id: 0, name: '', type: '', minutes: 0 };

  constructor(private workoutService: WorkoutService) {}

  addWorkout() {
    this.workoutService.addWorkout(this.workout);
    this.workout = { id: 0, name: '', type: '', minutes: 0 }; // Reset form
  }
}
