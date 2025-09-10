import { AsyncPipe } from '@angular/common';
import { Component, inject, model, OnInit } from '@angular/core';
import { TasksService } from '@services/tasks.service';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { startWith, Subject, switchMap, tap } from 'rxjs';
import { TaskCreateDTO, TaskDTO, TaskUpdateStatusDTO } from '@shared/models/task.model';
import { TableModule } from 'primeng/table';
import { CreateTaskModalComponent } from './components/create-task-modal/create-task-modal.component';
import { TasksTableComponent } from './components/tasks-table/tasks-table.component';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [
    TableModule,
    Button,
    DialogModule,
    InputTextModule,
    TasksTableComponent,
    CreateTaskModalComponent,
    AsyncPipe
  ],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.scss'
})
export class TrackerComponent implements OnInit {
  private readonly _tasksService = inject(TasksService);
  private readonly _refreshTrigger = new Subject<void>();

  public $createTaskDialogVisible = model(false);

  public products$ = this._refreshTrigger.pipe(
    startWith([]),
    switchMap(() => this._tasksService.getTasks())
  )

  products: TaskDTO[] = [
    {
      id: '1000',
      name: 'Bamboo Watch',
      tasks: 'asdasd',
      status: true
    }
  ]

  public ngOnInit(): void {

  }


  public toggleTask(task: TaskUpdateStatusDTO) {
    console.log(task)
    this._tasksService.updateTaskStatus(task).pipe(
      tap(() => this._refreshTrigger.next())
    )
  }

  public removeTask(id: string) {
    this._tasksService.deleteTask(id).pipe(
      tap(() => this._refreshTrigger.next())
    )
  }

  public createTask(task: TaskCreateDTO | null) {
    console.log(task)
    this.$createTaskDialogVisible.set(false);
  }


  public openCreateTaskModal(): void {
    this.$createTaskDialogVisible.set(true);
  }

  public closeCreateTaskModal(createTask: TaskCreateDTO | null): void {
    this.$createTaskDialogVisible.set(false);
  }
}
