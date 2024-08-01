import { Routes } from "@angular/router";
import { TaskListPageComponent } from "./task-list.page.component";
import { TaskUpdateComponent } from "./task-update.component";
import { TaskAddComponent } from "./task-add.component";
import { TaskEnddateUpdateComponent } from "./task-enddate-update.component";
import { TaskStateUpdateComponent } from "./task-state-update.component";
import { NotfoundPageComponent } from "./notfound.page.component";

export const routes: Routes = [
  { path: "", component: TaskListPageComponent },
  { path: "tasks/add", component: TaskAddComponent },
  { path: "tasks/update/:id", component: TaskUpdateComponent },
  { path: "tasks/update/:id/enddate", component: TaskEnddateUpdateComponent },
  { path: "tasks/update/:id/state", component: TaskStateUpdateComponent },
  { path: "notfound", component: NotfoundPageComponent }
];
