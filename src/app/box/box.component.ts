import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Box } from '../models/box';
import { BoxService } from '../services/box.service';

@Component({
  selector: 'app-box',
  imports: [],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxComponent implements OnInit {
  @Input() box!: Box;

  constructor(private boxService: BoxService) {}

  ngOnInit(): void {}

  selectBox(id: number) {
    this.boxService.selectBox(id);
  }
}
