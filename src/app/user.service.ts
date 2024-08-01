import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.URL}/api/user`);
  }
}
