import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: "root",
})
export class ChangeUserService {
  private reloadSubject:Subject<User> = new Subject();
  
  reload$ = this.reloadSubject.asObservable();
  
  constructor() {}

  changeUser(user:User){
    this.reloadSubject.next(user);
  }
}
