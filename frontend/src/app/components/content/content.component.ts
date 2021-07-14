import { Component, OnInit } from '@angular/core';
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';
import { MatDialog } from '@angular/material/dialog';
import { ShowComponent } from './dialogs/show/show.component';
import { EditComponent } from './dialogs/edit/edit.component';
import { DeleteComponent } from './dialogs/delete/delete.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  newTask: Task = {
    title: "",
    description: ""
  }

  dataSource: Task[];
    
  constructor(
    private taskService: TaskService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getTasks()
  }

  getTasks(status:number = 0) {
    this.taskService.read().subscribe(tasks => {
      this.dataSource = tasks;
    })
  }

  createTask():void {
    this.taskService.create(this.newTask).subscribe(() => {
      this.taskService.openSnackBar("Tarefa criada com sucesso!")
      this.ngOnInit()
    })
  }

  dialogShow(id: number) {
    this.dialog.open(ShowComponent,{
      width: '500px',
      data: {id: id}
    })
  }

  dialogEdit(id: number) {
    this.dialog.open(EditComponent, {
      width: '500px',
      data: {id: id}
    })
    this.dialog.afterAllClosed.subscribe(() => {
      this.ngOnInit()
    })
  }

  dialogDelete(id: number) {
    this.dialog.open(DeleteComponent, {
      width: '500px',
      data: {id: id}
    })
    this.dialog.afterAllClosed.subscribe(() => {
      this.ngOnInit()
    })
  }

  displayedColumns: string[] = ['id', 'title', 'action'];
}
