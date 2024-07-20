import { Component, OnInit } from '@angular/core';
import { Workout } from '../data/workout.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
})
export class WorkoutListComponent implements OnInit {
  workoutsByName: { [name: string]: Workout[] } = {};
  filteredWorkoutsByName: { [name: string]: Workout[] } = {};
  searchQuery: string = '';
  filterType: string = 'All';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workoutService.workouts$.subscribe(() => {
      this.workoutsByName = this.workoutService.getWorkouts();
      this.filteredWorkoutsByName = { ...this.workoutsByName };
      this.searchWorkouts(); // Filter the workouts initially
    });
  }

  searchWorkouts() {
    this.filteredWorkoutsByName = {};
    for (const name in this.workoutsByName) {
      const filteredWorkouts = this.workoutsByName[name].filter(
        (workout) =>
          workout.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
          (this.filterType === 'All' || workout.type === this.filterType)
      );
      if (filteredWorkouts.length) {
        this.filteredWorkoutsByName[name] = filteredWorkouts;
      }
    }
  }

  filterWorkouts() {
    this.searchWorkouts();
  }

  get paginatedWorkouts() {
    const allWorkouts = Object.values(this.filteredWorkoutsByName).flat();
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return allWorkouts.slice(start, end);
  }

  totalPages() {
    const allWorkouts = Object.values(this.filteredWorkoutsByName).flat();
    return Math.ceil(allWorkouts.length / this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
}
