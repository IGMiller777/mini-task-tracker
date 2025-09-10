import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, model, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TasksService } from '@services/tasks.service';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { filter, startWith, Subject, switchMap, tap } from 'rxjs';
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
    AsyncPipe,
    ToastModule
  ],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.scss',
  providers: [MessageService]
})
export class TrackerComponent {
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _messageService = inject(MessageService);
  private readonly _tasksService = inject(TasksService);
  private readonly _refreshTrigger = new Subject<void>();

  public $createTaskDialogVisible = model(false);

  public products$ = this._refreshTrigger.pipe(
    startWith([]),
    switchMap(() => this._tasksService.getTasks()),
    filter(products => products && !!products.length)
  )

  public createTask(task: TaskCreateDTO | null) {
    this.$createTaskDialogVisible.set(false);

    if (task) {
      this._tasksService.createTask(task).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
        next: () => {
          this._refreshTrigger.next();

          this.showMessageCreated();
        }
      });
    }

  }


  public toggleTask(task: TaskUpdateStatusDTO) {
    this._tasksService.updateTaskStatus(task).pipe(
      tap(() => this._refreshTrigger.next()),
      takeUntilDestroyed(this._destroyRef),
    ).subscribe(
      console.log
    )
  }

  public removeTask(id: string) {
    this._tasksService.deleteTask(id).pipe(
      tap(() => this._refreshTrigger.next()),
      takeUntilDestroyed(this._destroyRef)
    ).subscribe()
  }


  public openCreateTaskModal(): void {
    this.$createTaskDialogVisible.set(true);
  }

  private showMessageCreated(): void {
    this._messageService.add({
      severity: 'success',
      summary: 'Successfully created task',
      detail: 'You have successfully created a new task'
    });
  }
}
