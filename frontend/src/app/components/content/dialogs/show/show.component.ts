import { Component, OnInit, Inject } from '@angular/core';
import { Task } from '../../../../task.model';
import { TaskService } from 'src/app/task.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'task-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<ShowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) { }

  task: Task

  ngOnInit(): void {
    this.taskService.readById(this.data.id.toString()).subscribe(task => {
      this.task = task
    })
  }

  closeShow() {
    this.dialogRef.close();
  }
}
