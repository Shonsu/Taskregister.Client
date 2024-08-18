import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { TasksService } from "./data-access/task.service";
import { Task } from "./model/Task";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { DropdownModule } from "primeng/dropdown";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-task-enddate-update",
  standalone: true,
  imports: [
    RouterLink,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CommonModule,
  ],
  template: `
    <h2 class="flex flex-row justify-content-center p-1">Change EndDate!</h2>
    <form
      [formGroup]="taskForm"
      class="flex flex-row gap-2 justify-content-center p-2"
      (ngSubmit)="onSubmit()"
    >
      <div class="flex flex-column gap-2 align-items-center ">
        <div class="flex flex-row gap-2">
          <div class="flex flex-column gap-1">
            <label>Type</label>
            <input pInputText formControlName="type" />
          </div>
          <div class="flex flex-column gap-1">
            <label>Priority</label>
            <input pInputText formControlName="priority" />
          </div>
          <div class="flex flex-column gap-1">
            <label>Description</label>
            <textarea pInputTextarea formControlName="description"></textarea>
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex flex-column gap-1">
            <label>Extend by</label>
            <p-dropdown
              #extByDays
              (onChange)="onChange(extByDays.value)"
              [options]="extendDays"
              optionLabel="name"
              optionValue="name"
              formControlName="extendDays"
            />
          </div>
          <div class="flex flex-column gap-1">
            <label>Explanation</label>
            <textarea
              pInputTextarea
              formControlName="explanation"
              [class.invalid]="isValid('explanation')"
            ></textarea>
            <small *ngIf="isValid('explanation')">Explanation field is required.</small>
          </div>
          <!-- <input #task (keyup.enter)="submitText.emit(task.value); task.value = ''" /> -->
          <div class="flex flex-column gap-1 justify-content-center">
            <p-button type="submit" class="p-3">Save</p-button>
          </div>
        </div>
      </div>
      <!-- [disabled]="taskForm.invalid" -->
      <!-- (click)="submitText.emit(task.value); task.value = ''" -->
    </form>
    <p class="flex justify-content-center p-1">
      Current end date: {{ endDate | date : "yyyy-MM-dd HH:mm" }}
    </p>
    <p class="flex justify-content-center p-1">
      After change: {{ endDateAfterChange | date : "yyyy-MM-dd HH:mm" }}
    </p>
    <div class="flex justify-content-center p-2">
      <p-button routerLink="/" label="Back to task list" size="small" />
    </div>
  `,
  styles: `     
    .invalid {
        border: 1px solid red;
      }`,
})
export class TaskEnddateUpdateComponent {
  taskService = inject(TasksService);
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  taskForm!: FormGroup;
  endDate!: Date;
  endDateAfterChange: Date = new Date();
  extendDays = [
    { id: 1, name: 7 },
    { id: 2, name: 14 },
    { id: 3, name: 30 },
  ];

  onChange(days: number) {
    this.endDateAfterChange = this.addDays(days);
  }

  private addDays(days: number): Date {
    let dateNew = new Date(this.endDate);
    dateNew.setDate(dateNew.getDate() + days);
    return dateNew;
  }

  async ngOnInit() {
    this.taskForm = this.formBuilder.group({
      type: [{ value: "", disabled: true }, Validators.required],
      priority: [{ value: "", disabled: true }, Validators.required],
      description: { value: "", disabled: true },
      explanation: ["", Validators.required],
      extendDays: [this.extendDays[0].name],
    });
    await this.getTask();
    this.endDateAfterChange = this.addDays(this.extendDays[0].name);
    console.log("Description:", this.taskForm.get("description")?.value);
  }

  async getTask() {
    let id = Number(this.route.snapshot.params["id"]);
    await this.taskService.getById(id).then((response) => {
      if ("id" in response) {
        let t = response as Task;
        this.endDate = t.endDate;
        this.taskForm.patchValue({
          description: t.description,
          type: t.type,
          priority: t.priority,
        });
      }
    });
  }

  isValid(property: string): boolean | undefined {
    return this.taskForm.get(property)?.invalid; //|| && this.taskForm.get(property)?.dirty || this.taskForm.get(property)?.touched
  }
  onSubmit() {
    let id = Number(this.route.snapshot.params["id"]);
    this.taskService
      .endDateExtend(
        id,
        this.taskForm.get("extendDays")?.value,
        this.taskForm.get("explanation")?.value
      )
      .then((response) => {
        if (Number.isInteger(response)) {
          //   let result = this.getTask(response as number);
          // console.log("Tasks added with ID:", response);
          this.router.navigate(["/"]);
          alert("Tasks updated with ID:" + response);
        } else {
          alert(response);
        }
      });
  }
}
