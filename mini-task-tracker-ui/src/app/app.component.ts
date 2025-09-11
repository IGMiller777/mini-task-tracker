import { Component, OnInit } from '@angular/core';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BaseLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
