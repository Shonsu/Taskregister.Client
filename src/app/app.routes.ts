import { Routes } from "@angular/router";
import { TaskListPageComponent } from "./tasks/task-list.page.component";
import { TaskUpdateComponent } from "./tasks/task-update.component";
import { TaskAddComponent } from "./tasks/task-add.component";
import { TaskEnddateUpdateComponent } from "./tasks/task-enddate-update.component";
import { TaskStateUpdateComponent } from "./tasks/task-state-update.component";
import { NotfoundPageComponent } from "./notfound.page.component";
import {TestComponent} from "./test/test.component";

export const routes: Routes = [
  { path: "", component: TaskListPageComponent },
  { path: "tasks/add", component: TaskAddComponent },
  { path: "tasks/update/:id", component: TaskUpdateComponent },
  { path: "tasks/update/:id/enddate", component: TaskEnddateUpdateComponent },
  { path: "tasks/update/:id/state", component: TaskStateUpdateComponent },
  { path: "notfound", component: NotfoundPageComponent },
  { path: "test", component: TestComponent }
];
