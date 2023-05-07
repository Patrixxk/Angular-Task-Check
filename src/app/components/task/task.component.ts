import { Component } from '@angular/core';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { Task } from 'src/app/Task';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  task: Task[] = [];
  constructor(private taskService: TaskServiceService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((task) => (this.task = task));
  }
  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(() => (this.task = this.task.filter((t) => t.id !== task.id)));
  }
  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    console.log(task.reminder);
    this.taskService.updateTaskReminder(task).subscribe();
  }
  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => this.task.push(task));
  }
}
