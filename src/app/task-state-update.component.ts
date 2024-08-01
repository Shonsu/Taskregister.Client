import { CommonModule, NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputTextareaModule } from "primeng/inputtextarea";
import { TasksService } from "./task.service";
import { Task } from "./Task";
import { InputTextModule } from "primeng/inputtext";
import { identifierName } from "@angular/compiler";

type State = { id: number; name: string };

@Component({
  selector: "app-task-state-update",
  standalone: true,
  imports: [
    RouterLink,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CommonModule,
    NgIf,
  ],
  template: `
    <h2 class="flex flex-row justify-content-center p-1">Change Task state!</h2>
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
            <label>State</label>
            <p-dropdown
              [options]="states"
              optionLabel="name"
              optionValue="name"
              formControlName="state"
              [class.invalid]="canChange('priority')"
            />
            <small *ngIf="!canChange('state')"
              >You can't change task state {{ taskState }} to
              {{ this.taskForm.get("state")?.value }}</small
            >
          </div>

          <!-- <input #task (keyup.enter)="submitText.emit(task.value); task.value = ''" /> -->
          <div class="flex flex-column gap-1 justify-content-center">
            <p-button type="submit" class="p-3" [disabled]="!canChange('state')"
              >Save</p-button
            >
          </div>
        </div>
      </div>
      <!-- [disabled]="taskForm.invalid" -->
      <!-- (click)="submitText.emit(task.value); task.value = ''" -->
    </form>
    <div class="flex justify-content-center p-2">
      <p-button routerLink="/" label="Back to task list" size="small" />
    </div>
  `,
  styles: ``,
})
export class TaskStateUpdateComponent {
  taskService = inject(TasksService);
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  taskForm!: FormGroup;
  taskState!: string;
  endDateAfterChange: Date = new Date();

  states: State[] = [
    { id: 0, name: "NEW" },
    { id: 1, name: "COMPLETED" },
    { id: 2, name: "RESUMED" },
  ];
  async ngOnInit() {
    this.taskForm = this.formBuilder.group({
      type: [{ value: "", disabled: true }, Validators.required],
      priority: [{ value: "", disabled: true }, Validators.required],
      description: { value: "", disabled: true },
      explanation: ["", Validators.required],
      state: [""],
    });
    await this.getTask();
  }

  async getTask() {
    let id = Number(this.route.snapshot.params["id"]);
    await this.taskService.getById(id).then((response) => {
      if ("id" in response) {
        let t = response as Task;
        // console.log(t.state);
        // this.states.push(
        //   t.state === "NEW" ? { id: 1, name: "COMPLETED" } : { id: 1, name: "RESUMED" }
        // );
        // console.log(this.states[0]);
        this.taskState = t.state;
        this.taskForm.patchValue({
          description: t.description,
          type: t.type,
          priority: t.priority,
          state: t.state,
        });
      }
    });
  }

  onSubmit() {
    let id = Number(this.route.snapshot.params["id"]);
    this.taskService
      .changeState(id, this.taskForm.get("state")?.value)
      .then((response) => {
        if (Number.isInteger(response)) {
          //   let result = this.getTask(response as number);
          // console.log("Task added with ID:", response);
          this.router.navigate(["/"]);
          alert("Task state with ID:" + response + " has chaged.");
        } else {
          alert(response);
        }
      });
  }

  canChange(state: string): boolean | undefined{
    if (this.taskState === "NEW" && this.taskForm.get("state")?.value === "COMPLETED") {
      console.log("true" + this.taskState + " " + this.taskForm.get("state")?.value);
      return true;
    }
    if (
      this.taskState === "COMPLETED" &&
      this.taskForm.get("state")?.value === "RESUMED"
    ) {
      console.log("true" + this.taskState + " " + this.taskForm.get("state")?.value);
      return true;
    }
    if (
      this.taskState === "RESUMED" &&
      this.taskForm.get("state")?.value === "COMPLETED"
    ) {
      console.log("true" + this.taskState + " " + this.taskForm.get("state")?.value);
      return true;
    }
    console.log("false" + this.taskState + " " + this.taskForm.get("state")?.value);
    return false;
  }
}
