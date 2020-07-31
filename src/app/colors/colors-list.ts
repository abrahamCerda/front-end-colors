import {Color} from './color';

export interface ColorsList {
  colors: Color[];
  totalColors: number;
  totalPages: number;
  currentPage: number;
}
