import { Component, OnInit, Inject } from '@angular/core';
import { Task } from '../../../../task.model';
import { TaskService } from 'src/app/task.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'task-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) { }

  task: Task

  ngOnInit(): void {
    this.taskService.readById(this.data.id.toString()).subscribe(task => {
      this.task = task
    })
  }

  updateTask(): void {
    this.taskService.update(this.task).subscribe(() => {
      this.taskService.openSnackBar("Tarefa atualizada com sucesso!")
      this.dialogRef.close()
    })
  }

  closeShow(): void {
    this.dialogRef.close();
  }
}
