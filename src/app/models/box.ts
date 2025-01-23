import { Option } from './option';

export interface Box {
  id: number;
  option: Option | null;
  selected: boolean;
}
