import { inject, Injectable } from "@angular/core";
import { CreateTaskDTO } from "../model/CreateTaskDTO";
import { Task } from "../model/Task";
import { ListFetchingError } from "../../utils/list-state.type";
import { TaskUpdateDto } from "../model/TaskUpdateDto";
import { CookieService } from "ngx-cookie-service";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  private URL = environment.apiUrl;

  cookieService = inject(CookieService);

  async getAll() {
    let email = this.cookieService.get("user");
    return fetch(`${this.URL}/api/${email}/todos`).then<Task[] | ListFetchingError>(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        return { status: response.status, message: response.statusText };
      }
    );
  }

  async getAllWithSearch(priority: string, taskType: string, from: string, to: string) {
    let email = this.cookieService.get("user");
    return fetch(
      `${this.URL}/api/${email}/todos?priority=${priority}&taskType=${taskType}&from=${from}&to=${to}`
    ).then<Task[] | ListFetchingError>((response) => {
      if (response.ok) {
        let respo = response.json();
        console.log(respo);
        return respo;
      }
      return { status: response.status, message: response.statusText };
    });
  }

  async getById(taskId: number) {
    let email = this.cookieService.get("user");
    return fetch(`${this.URL}/api/${email}/todos/${taskId}`).then<
      Task | ListFetchingError
    >((response) => {
      if (response.ok) {
        return response.json();
      }
      return { status: response.status, message: response.statusText };
    });
  }

  async add(task: CreateTaskDTO) {
    let email = this.cookieService.get("user");
    return fetch(`${this.URL}/api/${email}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }).then<number | Error>((response) => {
      if (response.ok) {
        return response.json();
      }
      return new Error("Can't add task:" + response.status + " " + response.statusText);
    });
  }

  async update(taskId: number, task: TaskUpdateDto) {
    let email = this.cookieService.get("user");
    return fetch(`${this.URL}/api/${email}/todos/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }).then<Error | null>((response) => {
      if (response.ok) {
        return null;
      } else {
        return new Error(
          "Can't update task:" + response.status + " " + response.statusText
        );
      }
    });
  }

  async delete(taskId: number) {
    let email = this.cookieService.get("user");
    return fetch(`${this.URL}/api/${email}/todos/${taskId}`, {
      method: "DELETE",
    }).then<Error | null>((response) => {
      if (response.ok) {
        return null;
      } else {
        return new Error(
          "Can't delete task:" + response.status + " " + response.statusText
        );
      }
    });
  }

  async endDateExtend(taskId: number, days: number, explanation: string) {
    let email = this.cookieService.get("user");
    return fetch(`${this.URL}/api/${email}/todos/${taskId}/endDate`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ days: days, extendByDayRationale: explanation }),
    }).then<number | Error>((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return new Error(
          "Can't change task's end date:" + response.status + " " + response.statusText
        );
      }
    });
  }

  async changeState(taskId: number, state: string) {
    let email = this.cookieService.get("user");
    console.log(taskId, state);
    return fetch(`${this.URL}/api/${email}/todos/${taskId}/taskState?newState=${state}`, {
      method: "PATCH",
    }).then<number | Error>((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return new Error(
          "Can't change task's end date:" + response.status + " " + response.statusText
        );
      }
    });
  }
}
