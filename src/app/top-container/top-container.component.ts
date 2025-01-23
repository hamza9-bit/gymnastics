import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BoxService } from '../services/box.service';
import { BoxComponent } from '../box/box.component';
import { map, Observable } from 'rxjs';
import { Box } from '../models/box';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-container',
  standalone: true,
  imports: [BoxComponent, CommonModule],
  templateUrl: './top-container.component.html',
  styleUrl: './top-container.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopContainerComponent implements OnInit {
  boxes$: Observable<Box[]>;
  totalValue: number = 0;

  constructor(private boxService: BoxService) {
    this.boxes$ = this.boxService.state.pipe(
      map((state) => {
        return state.boxes;
      })
    );
  }

  ngOnInit(): void {
    this.boxService.state.subscribe(() => {
      this.totalValue = this.boxService.sumBoxesValues();
    });
  }

  resetBoxes(): void {
    return this.boxService.resetBoxes();
  }
}
