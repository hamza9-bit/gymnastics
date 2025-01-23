import { Injectable } from '@angular/core';
import { BoxState } from '../models/box-state';
import { Store } from '../store/store';
import { Option } from '../models/option';
export const initialState: BoxState = {
  boxes: [
    { id: 1, option: null, selected: false },
    { id: 2, option: null, selected: false },
    { id: 3, option: null, selected: false },
    { id: 4, option: null, selected: false },
    { id: 5, option: null, selected: false },
    { id: 6, option: null, selected: false },
    { id: 7, option: null, selected: false },
    { id: 8, option: null, selected: false },
    { id: 9, option: null, selected: false },
    { id: 10, option: null, selected: false },
  ],
  options: [
    { id: 1, image: '../../public/gym1.jpg', value: 300},
    { id: 2, image: '../../public/gym2.jpg', value: 20 },
    { id: 3, image: '../../public/gym3.jpg', value: 30 },
    { id: 4, image: '../../public/gym4.png', value: 40 },
    { id: 5, image: '../../public/gym4.png', value: 5 },
    { id: 6, image: '../../public/gym4.png', value: 25 },
    { id: 7, image: '../../public/gym4.png', value: 200 },
    { id: 8, image: '../../public/gym4.png', value: 300 },
    { id: 9, image: '../../public/gym4.png', value: 80 },
    { id: 10, image: '../../public/gym4.png', value: 70 },
  ],
};

@Injectable({
  providedIn: 'root',
})
export class BoxService extends Store<BoxState> {
  constructor() {
    super(BoxService.loadState());
    this.state.subscribe((state) => {
      BoxService.saveState(state);
    });
  }
  //load the state from local storage
  private static loadState(): BoxState {
    if (typeof window !== 'undefined' && localStorage) {
      const loadedState = localStorage.getItem('boxState');
      const parsedState = loadedState ? JSON.parse(loadedState) : initialState;
      // Reset the selected property of each box to false
      parsedState.boxes = parsedState.boxes.map((box: any) => ({
        ...box,
        selected: false,
      }));

      return parsedState;
    }
    return initialState;
  }
  //save the the state in the local storage
  private static saveState(state: BoxState): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('boxState', JSON.stringify(state));
    }
  }
  //Change the selected property to true so that the box get selected
  selectBox(id: number): void {
    this.updateState((state) => {
      const updatedBoxes = state.boxes.map((box) => {
        return {
          ...box,
          selected: box.id === id,
        };
      });

      return {
        ...state,
        boxes: updatedBoxes,
      };
    });
  }

  //Update the box with the option chosen
  updateBox(id: number, optionId: number): void {
    const selectedOption = this.value.options.find((option) => {
      return option.id === optionId;
    });
    if (selectedOption) {
      this.updateState((state) => {
        const updatedBox = state.boxes.map((box) => {
          return box.id === id
            ? {
                ...box,
                option: selectedOption,
              }
            : box;
        });
        return { ...state, boxes: updatedBox };
      });
    }

    //Either pass to the next box automatically or stay updating the last one
    //We can have this logic in another method and call it here for readability
    const currentBoxIndex = this.value.boxes.findIndex((box) => box.id === id);
    const nextBox =
      currentBoxIndex + 1 < this.value.boxes.length
        ? this.value.boxes[currentBoxIndex + 1]
        : this.value.boxes[currentBoxIndex];
    this.selectBox(nextBox.id);
  }

  //return the option selected from the option-selector
  getSelectedOptionForBox(boxId: number): Option | null {
    const selectedBox = this.value.boxes.find((box) => box.id === boxId);
    return selectedBox?.option ?? null;
  }

  resetBoxes(): void {
    this.updateState((state) => {
      const updatedBoxes = state.boxes.map((box) => {
        return {
          ...box,
          option: null,
        };
      });
      return { ...state, boxes: updatedBoxes, selectedBoxId: -1 };
    });
  }

  sumBoxesValues(): number {
    return this.value.boxes.reduce(
      (sum, box) => sum + (Number(box.option?.value) || 0),
      0
    );
  }
}
