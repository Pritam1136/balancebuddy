import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Workout } from './data/workout.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private workoutsSubject = new BehaviorSubject<{ [name: string]: Workout[] }>(
    this.loadFromLocalStorage()
  );
  workouts$ = this.workoutsSubject.asObservable();

  constructor() {}

  addWorkout(newWorkout: Workout) {
    const workoutsByName = this.workoutsSubject.getValue();

    // Ensure there is an array for the workout name
    if (!workoutsByName[newWorkout.name]) {
      workoutsByName[newWorkout.name] = [];
    }

    // Find index of the existing workout by type
    const existingTypeIndex = workoutsByName[newWorkout.name].findIndex(
      (workout) => workout.type === newWorkout.type
    );

    if (existingTypeIndex !== -1) {
      // Update the minutes for the existing workout
      workoutsByName[newWorkout.name][existingTypeIndex].minutes +=
        newWorkout.minutes;
    } else {
      // Add the new workout type under the same name
      workoutsByName[newWorkout.name].push(newWorkout);
    }

    // Save the updated workouts to localStorage
    this.saveToLocalStorage(workoutsByName);

    // Emit the updated state
    this.workoutsSubject.next({ ...workoutsByName });
  }

  getWorkouts(): { [name: string]: Workout[] } {
    return this.workoutsSubject.getValue();
  }

  private saveToLocalStorage(workouts: { [name: string]: Workout[] }) {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  private loadFromLocalStorage(): { [name: string]: Workout[] } {
    const storedWorkouts = localStorage.getItem('workouts');
    return storedWorkouts ? JSON.parse(storedWorkouts) : {};
  }
}
