import { Component, inject, input, output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TaskDTO, TaskUpdateStatusDTO } from '@shared/models/task.model';

@Component({
  selector: 'app-tasks-table',
  standalone: true,
  imports: [TableModule, Button, ToastModule, ConfirmDialogModule],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class TasksTableComponent {
  private readonly _confirmationService = inject(ConfirmationService);
  private readonly _messageService = inject(MessageService);

  public $products = input<TaskDTO[]>([]);
  public toggleTaskEmitter = output<TaskUpdateStatusDTO>();
  public removeTaskEmitter = output<string>();

  public toggleStatus({ status }: TaskDTO) {
    this.toggleTaskEmitter.emit({ status });
  }

  public removeTask(event: Event, task: TaskDTO) {
    this.openConfirmDialog(event, task);
    console.log(task);
  }

  private openConfirmDialog(event: Event, { id }: TaskDTO): void {
    this._confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.removeTaskEmitter.emit(id);
      },
      reject: () => {
        this._messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }
}
