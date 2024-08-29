import { Component, inject } from "@angular/core";
import { SubmitTextComponent } from "./submit-text.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CreateTaskDTO } from "./model/CreateTaskDTO";
import { TasksService } from "./data-access/task.service";
import { Router, RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-task-add",
  standalone: true,
  imports: [SubmitTextComponent, ReactiveFormsModule, RouterLink, ButtonModule],
  template: `
    <h2 class="flex flex-row justify-content-center p-1">Add task</h2>
    <form fxLayout="column" [formGroup]="taskForm">
      <app-submit-text (submitText)="addTask($event)" [parentForm]="taskForm" />
    </form>
    <div class="flex justify-content-center p-4">
      <p-button routerLink="/" label="Back to task list" size="small" />    
    </div>
  `,
  styles: ``,
})
export class TaskAddComponent {
  taskForm!: FormGroup;
  tasksService = inject(TasksService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      type: ["", Validators.required],
      priority: ["", Validators.required],
      description: "",
    });
  }

  addTask(task: CreateTaskDTO) {
    console.log("Submited task:", task);
    this.tasksService.add(task).then((response) => {
      if (Number.isInteger(response)) {
        //   let result = this.getTask(response as number);
        // console.log("tasks added with ID:", response);
        this.router.navigate(["/"]);
        // this.router.navigate(["/tasks/update", response]);
        alert("tasks added with ID:" + response);
      } else {
        alert(response);
      }
    });
  }
}
