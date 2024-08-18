import { Component, OnChanges, OnDestroy, OnInit, inject } from "@angular/core";
import { TaskListComponent } from "./task-list.component";
import { Task } from "./model/Task";
import { NgIf } from "@angular/common";
import { SubmitTextComponent } from "./submit-text.component";
import { TasksService } from "./data-access/task.service";
import { ComponentListState } from "../utils/list-state.type";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { RouterLink } from "@angular/router";
import { ChangeUserService } from "../change-user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-task-list-page",
  standalone: true,
  template: `
    <div class="flex justify-content-center p-4">
      <p-button routerLink="/tasks/add" label="Add new task" size="small" />
    </div>
    <app-task-list
      (confirmDelete)="deleteTask($event)"
      *ngIf="listState.state === 'success'"
      [tasks]="listState.results"
    />

    <p *ngIf="listState.state === 'error'">
      {{ listState.error.status }} {{ listState.error.message }}
    </p>
    <p *ngIf="listState.state === 'loading'">Loading...</p>
  `,
  styles: ``,
  imports: [
    SubmitTextComponent,
    TaskListComponent,
    NgIf,
    ReactiveFormsModule,
    ButtonModule,
    RouterLink,
  ],
})
export class TaskListPageComponent implements OnInit, OnDestroy {
  listState: ComponentListState<Task> = { state: "idle" };
  tasksService = inject(TasksService);
  changeUser = inject(ChangeUserService);
  changeUserSubscription!: Subscription;
  
  constructor() {
    this.getTasks();
  }

  ngOnInit(): void {
    this.changeUserSubscription = this.changeUser.reload$.subscribe(() => {
      this.getTasks();
    });
  }

  ngOnDestroy() {
    if (this.changeUserSubscription) {
      this.changeUserSubscription.unsubscribe();
    }
  }

  getTasks() {
    this.listState = { state: "loading" };
    this.tasksService.getAll().then((response) => {
      if (Array.isArray(response)) {
        this.listState = { state: "success", results: response };
      } else {
        this.listState = { state: "error", error: response };
      }
    });
  }

  deleteTask(taskId: number) {
    console.log("Want to delete task with id: ", taskId);
    this.tasksService.delete(taskId);
  }
}
