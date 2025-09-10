import { inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TaskCreateDTO, TaskDTO, TaskUpdateStatusDTO } from '@shared/models/task.model';
import { TasksRepository } from '../repositories/tasks.repository';

@Injectable({providedIn: 'root'})
export class TasksService implements OnDestroy {
  private readonly _destroy$ = new Subject<void>();
  private readonly _tasksRepository = inject(TasksRepository);

  public getTasks(): Observable<TaskDTO[]> {
    return this._tasksRepository.getTasks();
  }

  // TODO
  public createTask(payload: TaskCreateDTO): Observable<TaskDTO> {
    return this._tasksRepository.createTask(payload);
  }

  // TODO
  public updateTaskStatus(payload: TaskUpdateStatusDTO): Observable<TaskDTO> {
    return this._tasksRepository.updateTaskStatus(payload);
  }

  public deleteTask(id: string): Observable<TaskDTO> {
    return this._tasksRepository.deleteTask(id);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
