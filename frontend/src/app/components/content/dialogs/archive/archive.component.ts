import { Component, OnInit, Inject } from '@angular/core';
import { Task } from '../../../../task.model';
import { TaskService } from 'src/app/task.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<ArchiveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) { }

  task: Task
  mensagem:string = ""


  ngOnInit(): void {
    this.taskService.readById(this.data.id.toString()).subscribe(task => {
      this.task = task
    })
  }

  updateTask(): void {
    if(this.data.action == "archive") {
      this.task.status = "1"
      this.mensagem = "Tarefa arquivada com sucesso!"
    }
    else {
      this.task.status = "0"
      this.mensagem = "Tarefa desarquivada com sucesso!"
    }
    this.taskService.update(this.task).subscribe(() => {
      this.taskService.openSnackBar(this.mensagem)
      this.dialogRef.close()
    })
  }

  closeShow(): void {
    this.dialogRef.close();
  }

}
