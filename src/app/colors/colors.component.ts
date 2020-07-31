import { Component, OnInit } from '@angular/core';
import {Color} from './color';
import {ColorsService} from './colors.service';
import {StateService} from '../state.service';
import {Router} from '@angular/router';
import {MatrixHelper} from '../utils/MatrixHelper';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {

  numberOfCols = 3;
  colors: Color[][];
  loading: boolean;
  lastLineIndexes: number[];
  middleColumnIndexes: number[];
  colNumber = Math.floor(12 / this.numberOfCols);
  currentPage = 0;
  totalNumberOfPages: number;
  pageSize = 6;
  newColor: Color;
  editing: boolean;

  constructor(private readonly colorsService: ColorsService,
              private readonly stateService: StateService,
              private readonly router: Router) {
    this.lastLineIndexes = [];
    this.middleColumnIndexes = [];
    this.newColor = {
      id: null,
      name: null,
      color: null,
      pantone: null,
      year: null
    };
  }

  ngOnInit(): void {
    this.loading = true;
    this.getData(this.currentPage, this.pageSize);
  }

  isLastRow(rowIndex): boolean{
    return rowIndex === (this.colors.length - 1);
  }

  isMiddleCol(columnIndex): boolean{
    return columnIndex !== 0 && columnIndex !== (this.numberOfCols - 1);
  }

  isLastCol(columnIndex): boolean{
    return columnIndex === (this.numberOfCols - 1);
  }

  isFirstCol(columnIndex): boolean{
    return columnIndex === 0;
  }

  logout(): void {
    this.stateService.clearData();
    this.router.navigateByUrl('/');
  }

  nextPage(): void{
    this.loading = true;
    this.getData(this.currentPage + 1, this.pageSize);
  }

  previousPage(): void{
    this.loading = true;
    this.getData(this.currentPage - 1, this.pageSize);
  }

  private getData(page, pageSize): void{
    this.colorsService.getColors(page, pageSize)
      .subscribe(data => {
        this.colors = MatrixHelper.listToMatrix(data.colors, this.numberOfCols);
        this.totalNumberOfPages = data.totalPages;
        this.currentPage = data.currentPage;
        // tslint:disable-next-line:no-conditional-assignment
        // @ts-ignore
        /*const colorsLen = this.colors.length;
        const n = colorsLen < this.pageSize ? colorsLen : this.pageSize;
        for (let i = this.firstMiddleIndex; i < n; i = i + this.elementsPerRow){
          this.middleColumnIndexes.push(i);
        }
        let j = 0;
        let lastRowElements = n % this.elementsPerRow;
        if (!lastRowElements){
          lastRowElements = this.elementsPerRow;
        }
        while (j < lastRowElements){
          this.lastLineIndexes.push((n - 1) - j);
          j++;
        }*/
        this.loading = false;
      }, error => {
        console.error(error);
      });
  }

  saveColor(): void{
    this.loading = true;
    if (this.editing){
      return;
    }else{
      console.log(this.colorsService);
      this.colorsService.createColor(this.newColor)
        .subscribe(color => {
          console.log('RESPUESTA POST', color);
          this.hideModal('#createColorModal');
          this.loading = false;
          this.getData(this.currentPage, this.pageSize);
        }, error => {
          console.error(error);
        });
    }
  }

  showModal(modalName): void{
    // @ts-ignore
    window.$(modalName).modal('show');
  }

  hideModal(modalName): void{
    // @ts-ignore
    window.$(modalName).modal('hide');
  }



}
