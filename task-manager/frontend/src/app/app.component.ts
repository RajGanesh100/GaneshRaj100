import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle = '';
  loading = false;
  errorMessage = '';

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.errorMessage = '';
    this.taskService.getTasks().subscribe({
      next: tasks => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load tasks.';
        this.loading = false;
      }
    });
  }

  addTask() {
    const title = this.newTaskTitle.trim();
    if (!title) {
      return;
    }

    this.taskService.addTask({ title, completed: false }).subscribe({
      next: task => {
        this.tasks.push(task);
        this.newTaskTitle = '';
      },
      error: () => {
        this.errorMessage = 'Failed to add task.';
      }
    });
  }

  toggleCompletion(task: Task) {
    this.taskService.updateTask({ ...task, completed: !task.completed }).subscribe({
      next: updated => {
        task.completed = updated.completed;
      },
      error: () => {
        this.errorMessage = 'Unable to update task status.';
      }
    });
  }

  deleteTask(task: Task) {
    if (!task.id) {
      return;
    }

    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      },
      error: () => {
        this.errorMessage = 'Failed to delete task.';
      }
    });
  }
}
