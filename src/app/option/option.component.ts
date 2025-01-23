import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Option } from '../models/option';

import { BoxService } from '../services/box.service';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [],
  templateUrl: './option.component.html',
  styleUrl: './option.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent implements OnInit {
  @Input() option!: Option;
  boxSelectedId: number = -1;
  isSelected: boolean = false;
  constructor(private boxService: BoxService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.boxService.state.subscribe((state) => {
      //look for the box which got selected
      const selectedBox = state.boxes.find((box) => box.selected);
      if (selectedBox) {
        this.boxSelectedId = selectedBox.id;
      }

      //calling getSelectOptionForBox to show the option selected in the option-selector
      if (this.boxSelectedId !== null) {
        const selectedOption = this.boxService.getSelectedOptionForBox(
          this.boxSelectedId
        );

        this.isSelected = selectedOption?.id === this.option.id;
      } else {
        this.isSelected = false;
      }
      //mark for check
      this.cdr.markForCheck();
    });
  }

  //Update the box with the option chosen
  selectOption(): void {
    if (this.boxSelectedId !== null) {
      this.boxService.updateBox(this.boxSelectedId, this.option.id);
    } else {
      console.log('no box was selected');
    }
  }
}
