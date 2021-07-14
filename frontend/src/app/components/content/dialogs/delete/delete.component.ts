import { Component, OnInit, Inject } from '@angular/core';
import { Task } from '../../../../task.model';
import { TaskService } from 'src/app/task.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'task-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
  ) { }

  task: Task

  ngOnInit(): void {
    this.taskService.readById(this.data.id.toString()).subscribe(task => {
      this.task = task
    })
  }

  deleteTask(): void{
    this.taskService.delete(this.task).subscribe(() => {
      this.taskService.openSnackBar("Tarefa excluída com sucesso!")
      this.dialogRef.close()
    })
  }

  closeShow() {
    this.dialogRef.close();
  }
}
