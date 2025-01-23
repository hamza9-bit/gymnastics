import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { OptionComponent } from '../option/option.component';
import { map, Observable } from 'rxjs';

import { Option } from '../models/option';
import { CommonModule } from '@angular/common';
import { BoxService } from '../services/box.service';

@Component({
  selector: 'app-bottom-container',
  standalone: true,
  imports: [OptionComponent, CommonModule],
  templateUrl: './bottom-container.component.html',
  styleUrl: './bottom-container.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomContainerComponent implements OnInit {
  options$: Observable<Option[]>;
  boxSelected$: Observable<boolean>;

  constructor(private boxService: BoxService) {
    this.options$ = this.boxService.state.pipe(
      map((state) => {
        return state.options;
      })
    );
    this.boxSelected$ = this.boxService.state.pipe(
      map((state) => state.boxes.some((box) => box.selected))
    );
  }

  ngOnInit(): void {}
}
