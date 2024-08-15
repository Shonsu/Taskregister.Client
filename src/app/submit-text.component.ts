import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CreateTaskDTO } from "./CreateTaskDTO";
import { NgIf } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";

@Component({
  selector: "app-submit-text",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
  ],
  template: `
    <form
      [formGroup]="parentForm"
      class="flex flex-row gap-2 justify-content-center p-2"
      (ngSubmit)="onSubmit()"
    >
      <div class="flex flex-column gap-1">
        <label>Type</label>
        <p-dropdown
          [options]="types"
          optionLabel="name"
          optionValue="name"
          formControlName="type"
          [class.invalid]="isValid('type')"
        />
        <small *ngIf="isValid('type')">Type field is required.</small>
      </div>
      <div class="flex flex-column gap-1">
        <label>Priority</label>
        <p-dropdown
          [options]="priorities"
          optionLabel="name"
          optionValue="name"
          formControlName="priority"
          [class.invalid]="isValid('priority')"
        />
        <small *ngIf="isValid('priority')">Type field is required.</small>
      </div>
      <div class="flex flex-column gap-1">
        <label>Description</label>
        <textarea pInputTextarea formControlName="description"></textarea>
      </div>
      <!-- <input #task (keyup.enter)="submitText.emit(task.value); task.value = ''" /> -->
      <div class="flex flex-column gap-1 justify-content-center">
        <p-button type="submit" class="p-3" [disabled]="parentForm.invalid">Save</p-button>
      </div>
      <!-- [disabled]="taskForm.invalid" -->
      <!-- (click)="submitText.emit(task.value); task.value = ''" -->
    </form>
  `,
  styles: [
    `
      .invalid {
        border: 1px solid red;
      }
      input:focus + button {
        @apply text-orange-400;
      }
    `,
  ],
})
export class SubmitTextComponent implements OnInit {
  @Output() submitText = new EventEmitter<any>();
  @Input() parentForm!: FormGroup;

  types = [
    { id: 1, name: "Type1" },
    { id: 2, name: "Type2" },
    { id: 3, name: "Type3" },
  ];
  priorities = [
    { id: 1, name: "Low" },
    { id: 2, name: "High" },
  ];

  constructor() {}
  ngOnInit(): void {}

  onSubmit(): void {
    this.submitText.emit({
      type: this.parentForm.get("type")?.value,
      priority: this.parentForm.get("priority")?.value,
      description: this.parentForm.get("description")?.value,
    } as CreateTaskDTO);
  }

  isValid(property: string): boolean | undefined {
    return this.parentForm.get(property)?.invalid; //|| && this.taskForm.get(property)?.dirty || this.taskForm.get(property)?.touched
  }

  get type() {
    return this.parentForm.get("type");
  }
  get priority() {
    return this.parentForm.get("priority");
  }
  get description() {
    return this.parentForm.get("description");
  }
}
