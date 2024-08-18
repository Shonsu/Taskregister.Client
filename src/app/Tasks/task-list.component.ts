import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { Task } from "./model/Task";
import { CommonModule, NgFor } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { RouterLink } from "@angular/router";
import { TaskSearchComponent } from "./task-search.component";
import { QuerySearchParamters } from "../QuerySearchParamters";
import { TasksService } from "./data-access/task.service";
import { ComponentListState } from "../utils/list-state.type";

@Component({
  selector: "app-task-list",
  standalone: true,
  template: `
    <p-confirmDialog
      header="Confirmation"
      icon="pi pi-exclamation-triangle"
      [style]="{ width: '40vw' }"
    ></p-confirmDialog>
    <div class="flex flex-column justify-content-center align-items-center ">
      <app-task-search (search)="searchTasks($event)" />
      <p-table
        #dt
        class="flex justify-content-center  m-2 p-2 border-1 border-primary"
        [value]="tasks"
        styleClass="p-datatable-striped"
        [tableStyle]="{ 'min-width': '50rem' }"
      >
        <ng-template pTemplate="header">
          <tr>
            <th>Id</th>
            <th>Type</th>
            <th>Priority</th>
            <th>EndDate</th>
            <th>State</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </ng-template>

        <ng-template pTemplate="body" let-task>
          <tr>
            <td>{{ task.id }}</td>
            <td>{{ task.type }}</td>
            <td>{{ task.priority }}</td>
            <td>{{ task.endDate | date : "yyyy-MM-dd HH:mm" }}</td>
            <td>{{ task.state }}</td>
            <td>{{ task.description }}</td>
            <td class="flex flex-row gap-2">
              <p-button
                routerLink="/tasks/update/{{ task.id }}"
                label="Edit"
                size="small"
                [disabled]="task.state === 'Completed'"
                [class.disabled]="task.state === 'Completed' ? true : null"
              />
              <p-button
                routerLink="/tasks/update/{{ task.id }}/enddate"
                label="Extend EndDate"
                size="small"
                [disabled]="task.state === 'Completed'"
                [class.disabled]="task.state === 'Completed' ? true : null"
              />
              <p-button
                routerLink="/tasks/update/{{ task.id }}/state"
                label="Change state"
                size="small"
              />
              <p-button
                label="Delete"
                (click)="task.state === 'Completed' ? '' : deleteTask(task.id)"
                severity="danger"
                size="small"
                [disabled]="task.state === 'Completed'"
              />
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
  styles: `
  p-button.disabled {
        pointer-events: none;
        cursor: default;
    }
`,
  providers: [ConfirmationService],
  imports: [
    NgFor,
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    RouterLink,
    CommonModule,
    TaskSearchComponent,
  ],
})
export class TaskListComponent {
  @Output() confirmDelete = new EventEmitter<any>();
  @Input({ required: true }) tasks: Task[] = [];
  tasksService = inject(TasksService);
  listState: ComponentListState<Task> = { state: "idle" };
  constructor(private confirmationService: ConfirmationService) {}

  deleteTask(taskId: number) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to perform this action?",
      accept: () => {
        this.confirmDelete.emit(taskId);
        this.tasks.forEach((value, index) => {
          if (taskId == value.id) {
            this.tasks.splice(index, 1);
          }
        });
      },
      reject: () => {
        console.log("reject delete");
      },
    });
  }

  async searchTasks(query: QuerySearchParamters) {
    console.log(query.type);
    console.log(query.priority);
    console.log(query.dateFrom);
    console.log(query.dateTo);
    let priority = query.priority === null ? "" : query.priority;
    let type = query.type === null ? "" : query.type;
    let from = query.dateFrom.toISOString();
    let to = query.dateTo.toISOString();
    console.log("from: " + from);
    console.log("to: " + to);
    await this.tasksService
      .getAllWithSearch(priority, type, from, to)
      .then((response) => {
        if (Array.isArray(response)) {
          this.listState = { state: "success", results: response };
          this.tasks = response;
        } else {
          this.listState = { state: "error", error: response };
        }
      });
    console.log(this.listState.state);
    //this.tasks = (this.listState as SuccessState;
  }
}
