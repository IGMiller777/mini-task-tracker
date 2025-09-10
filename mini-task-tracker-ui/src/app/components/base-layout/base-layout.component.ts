import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TrackerComponent } from '../tracker/tracker.component';
import { PendingService } from '@services/pending.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [
    ProgressSpinnerModule,
    AsyncPipe,
    TrackerComponent
  ],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class BaseLayoutComponent implements OnInit {

  private readonly _pendingService = inject(PendingService);
  pending$: Observable<boolean> = this._pendingService.pending$;

  ngOnInit() {
  }
}
