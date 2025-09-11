import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, model } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TasksService } from '@services/tasks.service';
import {
  TaskCreateDTO,
  TaskDTO,
  TaskUpdateStatusDTO,
} from '@shared/models/task.model';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { finalize, Observable, startWith, Subject, switchMap, tap } from 'rxjs';
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
    ToastModule,
    ConfirmDialogModule,
  ],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.scss',
  providers: [MessageService],
})
export class TrackerComponent {
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _messageService = inject(MessageService);
  private readonly _tasksService = inject(TasksService);
  private readonly _refreshTrigger = new Subject<void>();

  public $createTaskDialogVisible = model(false);

  public products$ = this._refreshTrigger.pipe(
    startWith([]),
    switchMap(() => this._tasksService.getTasks())
  ) as Observable<TaskDTO[]>;

  public createTask(task: TaskCreateDTO | null): void {
    this.$createTaskDialogVisible.set(false);

    if (task) {
      this._tasksService
        .createTask(task)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({
          next: response => {
            if (response) {
              this._refreshTrigger.next();

              this.showMessage(
                'success',
                'Successfully created task',
                'You have successfully created a new task'
              );
            } else {
              this.showMessage(
                'error',
                'Error while creating task',
                'Please try again later'
              );
            }
          },
        });
    }
  }

  public toggleTask(task: TaskUpdateStatusDTO): void {
    this._tasksService
      .updateTaskStatus(task)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: response => {
          this._refreshTrigger.next();

          if (response) {
            this.showMessage(
              'success',
              'Successfully changed Task status',
              'You have successfully change a Task status'
            );
          } else {
            this.showMessage(
              'error',
              'Error while changing task status',
              'Please try again later'
            );
          }
        },
      });
  }

  public removeTask(id: string): void {
    this._tasksService
      .deleteTask(id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: response => {
          if (response) {
            this._refreshTrigger.next();

            this.showMessage(
              'success',
              'Successfully Task deleted',
              'You have successfully delete a Task'
            );
          } else {
            this.showMessage(
              'error',
              'Error while deleting task',
              'Please try again later'
            );
          }
        },
      });
  }

  public openCreateTaskModal(): void {
    this.$createTaskDialogVisible.set(true);
  }

  private showMessage(
    severity: 'success' | 'error',
    summary: string,
    detail: string
  ): void {
    this._messageService.add({
      severity,
      summary,
      detail,
      life: 2000
    });
  }
}
