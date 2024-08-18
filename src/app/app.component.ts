import { Component, inject } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { UserService } from "./user/user.service";
import { NgFor } from "@angular/common";
import { User } from "./user/user";
import { CookieService } from "ngx-cookie-service";
import { ChangeUserService } from "./change-user.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, NgFor],
  template: `
    <nav class="flex bg-primary">
      <ul class="flex gap-6" *ngFor="let user of users">
        <li (click)="changeUser(user)" [class.font-bold]="user.active">
          {{ user.email }}
        </li>
      </ul>
    </nav>
    <main>
      <router-outlet />
    </main>
  `,
  styles: [],
})
export class AppComponent {
  users: Array<User> = [];
  usersService = inject(UserService);
  cookieService = inject(CookieService);
  changeUserService = inject(ChangeUserService);

  ngOnInit() {
    let email = this.cookieService.get("user");
    if (email !== null) {
      this.usersService.getUsers().subscribe((users) => {
        this.users = users;
        this.cookieService.set("user", users[0].email);
        this.changeUser(users[0]);
        console.log(this.cookieService.get("user"));
      });
    }
  }

  changeUser(u: User) {
    this.cookieService.deleteAll();
    this.cookieService.set("user", u.email);
    console.log(this.cookieService.get("user"));
    this.users.forEach((u) => (u.active = false));
    u.active = true;
    this.changeUserService.changeUser(u);
  }
}
