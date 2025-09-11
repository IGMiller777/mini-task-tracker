import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TrackerComponent } from '../tracker/tracker.component';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [ProgressSpinnerModule, TrackerComponent],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseLayoutComponent {}
