import { Component, model, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TaskCreateDTO } from '@shared/models/task.model';

@Component({
  selector: 'app-create-task-modal',
  standalone: true,
  imports: [Button, DialogModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './create-task-modal.component.html',
  styleUrl: './create-task-modal.component.scss',
})
export class CreateTaskModalComponent {
  public $createTaskDialogVisible = model(false);

  public closeModalEmitter = output<TaskCreateDTO | null>();

  public readonly form = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  public createTask(): void {
    const { title } = this.form.getRawValue();

    if (this.form.valid && title) {
      this.closeModalEmitter.emit({ title, completed: false });
      this.form.reset();
    }
  }
}
