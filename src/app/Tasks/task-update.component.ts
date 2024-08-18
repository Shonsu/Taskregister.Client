import { Component } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { TasksService } from "./data-access/task.service";
import { SubmitTextComponent } from "./submit-text.component";
import { TaskUpdateDto } from "./model/TaskUpdateDto";
import { Task } from "./model/Task";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgIf } from "@angular/common";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-task-update",
  standalone: true,
  imports: [SubmitTextComponent, ReactiveFormsModule, NgIf, RouterLink, ButtonModule],
  template: `
    <h2 class="flex flex-row justify-content-center p-1">Update task</h2>
    <form [formGroup]="taskForm">
      <app-submit-text (submitText)="updateTask($event)" [parentForm]="taskForm" />
    </form>
    <div class="flex justify-content-center p-4">
      <p-button routerLink="/" label="Back to task list" size="small" />
    </div>
  `,
  styles: ``,
})
export class TaskUpdateComponent {
  taskForm!: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TasksService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit() {
    this.taskForm = this.formBuilder.group({
      type: ["", Validators.required],
      priority: ["", Validators.required],
      description: "",
    });
    await this.getTask();
    console.log("Description:", this.taskForm.get("description")?.value);
  }

  async getTask() {
    let id = Number(this.route.snapshot.params["id"]);
    console.log(id);
    await this.taskService.getById(id).then((response) => {
      if ("id" in response) {
        let t = response as Task;
        console.log("Description:", response.description);
        console.log("Type:", response.type);
        console.log("Priority:", response.priority);
        this.taskForm.patchValue({
          description: t.description,
          type: t.type,
          priority: t.priority,
        });
      }
    });
  }

  updateTask(task: TaskUpdateDto) {
    let id = Number(this.route.snapshot.params["id"]);
    this.taskService.update(id, task).then((response) => {
      if (response == null) {
        this.router.navigate(["/tasks/update", id]);
        alert("Tasks updated with ID:" + id);
      } else {
        alert(response);
      }
    });
  }
}
