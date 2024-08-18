import { Routes } from "@angular/router";
import { TaskListPageComponent } from "./Tasks/task-list.page.component";
import { TaskUpdateComponent } from "./Tasks/task-update.component";
import { TaskAddComponent } from "./Tasks/task-add.component";
import { TaskEnddateUpdateComponent } from "./Tasks/task-enddate-update.component";
import { TaskStateUpdateComponent } from "./Tasks/task-state-update.component";
import { NotfoundPageComponent } from "./notfound.page.component";

export const routes: Routes = [
  { path: "", component: TaskListPageComponent },
  { path: "tasks/add", component: TaskAddComponent },
  { path: "tasks/update/:id", component: TaskUpdateComponent },
  { path: "tasks/update/:id/enddate", component: TaskEnddateUpdateComponent },
  { path: "tasks/update/:id/state", component: TaskStateUpdateComponent },
  { path: "notfound", component: NotfoundPageComponent }
];
