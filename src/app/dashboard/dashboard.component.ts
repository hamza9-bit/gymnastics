import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TopContainerComponent } from '../top-container/top-container.component';
import { BottomContainerComponent } from '../bottom-container/bottom-container.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopContainerComponent, BottomContainerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
