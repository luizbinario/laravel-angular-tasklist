import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseUrl = 'http://127.0.0.1:8000/api/tasks';

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  )
  { }

  openSnackBar(msg) {
    this.snackBar.open(
      msg, "X",
      {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }
    )
  }

  read(): any {
    return this.http.get<Task[]>(this.baseUrl);
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  readById(id: string): Observable<Task> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Task>(url);
  }

  update(task: Task): Observable<Task> {
    const url = `${this.baseUrl}/${task.id}`
    return this.http.put<Task>(url, task);
  }

  delete(task: Task){
    const url = `${this.baseUrl}/${task.id}`
    return this.http.delete(url);
  }
}
