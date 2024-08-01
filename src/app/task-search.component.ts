import { Component, EventEmitter, inject, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { QuerySearchParamters } from "./QuerySearchParamters";

@Component({
  selector: "app-task-search",
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule, ButtonModule, CalendarModule],
  template: `
    <form
      (reset)="onReset($event)"
      [formGroup]="searchForm"
      class="flex flex-row gap-2 p-2"
      (ngSubmit)="onSubmit()"
    >
      <div class="flex flex-column gap-1">
        <label>Type</label>
        <p-dropdown
          [options]="types"
          optionValue="name"
          optionLabel="name"
          formControlName="type"
          showClear="true"
        />
      </div>
      <div class="flex flex-column gap-1">
        <label>Priority</label>
        <p-dropdown
          [options]="priorities"
          optionLabel="name"
          optionValue="name"
          formControlName="priority"
          showClear="ture"
        />
      </div>
      <div class="flex flex-column gap-1">
        <label for="date-From">Date from</label>
        <p-calendar
          inputId="date-From"
          [showTime]="true"
          dateFormat="yy-mm-dd"
          formControlName="dateFrom"
          showClear="true"
        />
      </div>
      <div class="flex flex-column gap-1">
        <label for="date-To">Date to</label>
        <p-calendar
          inputId="date-To"
          [showTime]="true"
          dateFormat="yy-mm-dd"
          formControlName="dateTo"
          showClear="true"
        />
      </div>
      <div class="flex align-items-end gap-1">
        <p-button type="submit">Search</p-button>
        <p-button type="reset" [disabled]="searchForm.pristine">Reset</p-button>
      </div>
    </form>
  `,
  styles: ``,
})
export class TaskSearchComponent {
  @Output() search = new EventEmitter<any>();
  searchForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  
  types = [
    { id: 1, name: "TYPE_1" },
    { id: 2, name: "TYPE_2" },
    { id: 3, name: "TYPE_3" },
  ];

  priorities = [
    { id: 1, name: "LOW" },
    { id: 2, name: "HIGH" },
  ];

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      type: null,
      priority: null,
      dateFrom: null,
      dateTo: null,
    });
  }

  onSubmit() {
    // console.log(this.searchForm.value);
    this.search.emit({
      type: this.searchForm.get("type")?.value,
      priority: this.searchForm.get("priority")?.value,
      dateFrom: this.searchForm.get("dateFrom")?.value,
      dateTo: this.searchForm.get("dateTo")?.value,
    } as QuerySearchParamters);
  }

  onReset(e: Event) {
    console.log("reset event");
    this.onSubmit();
    this.searchForm.markAsPristine();
  }
}
