import { Component } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogService } from "primeng/dynamicdialog";
import { TableModule } from "primeng/table";
import { TaskSearchComponent } from "./Tasks/task-search.component";

@Component({
  selector: "app-notfound-page",
  standalone: true,
  template: `
    <p>notfound.page works!</p>
    <app-task-search class="flex flex-column align-items-center justify-content-start" />
  `,
  styles: ``,
  providers: [DialogService, MessageService, ConfirmationService],
  imports: [
    ConfirmDialogModule,
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    TaskSearchComponent,
  ],
})
export class NotfoundPageComponent {}
