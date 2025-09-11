import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { catchError, Observable, of, Subject } from 'rxjs';
import {
  TaskCreateDTO,
  TaskDTO,
  TaskUpdateStatusDTO
} from '@shared/models/task.model';
import { BASE_URL_INJECTION_TOKEN } from '@shared/injection-tokens/base-url.injection-token';

@Injectable({providedIn: 'root'})
export class TasksRepository implements OnDestroy {
  private readonly _destroy$ = new Subject<void>();
  private readonly _baseUrl = inject(BASE_URL_INJECTION_TOKEN);
  private readonly _httpClient = inject(HttpClient);

  public getTasks(): Observable<TaskDTO[]> {
    return this._httpClient.get<TaskDTO[]>(`${this._baseUrl}/tasks`).pipe(catchError(() => of([])));
  }

  public createTask(payload: TaskCreateDTO): Observable<TaskDTO | null> {
    return this._httpClient.post<TaskDTO>(`${this._baseUrl}/tasks`, payload).pipe(catchError(() => of(null)));
  }

  public updateTaskStatus({id, completed}: TaskUpdateStatusDTO): Observable<TaskDTO | null> {
    return this._httpClient.patch<TaskDTO>(`${this._baseUrl}/tasks/${id}`, {completed}).pipe(catchError(() => of(null)));
  }

  public deleteTask(id: string): Observable<TaskDTO | null> {
    return this._httpClient.delete<TaskDTO>(`${this._baseUrl}/tasks/${id}`).pipe(catchError(() => of(null)));
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
