import { Component, OnInit } from '@angular/core';
import {Color} from './color';
import {ColorsService} from './colors.service';
import {StateService} from '../state.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {

  colors: Color[];
  loading: boolean;
  lastLineIndexes: number[];
  middleColumnIndexes: number[];
  elementsPerRow = 3;
  firstMiddleIndex = 1;
  colNumber = Math.floor(12 / this.elementsPerRow);
  currentPage = 0;
  totalNumberOfPages: number;
  pageSize = 6;
  editing: boolean;

  constructor(private readonly colorsService: ColorsService,
              private readonly stateService: StateService,
              private readonly router: Router) {
    this.lastLineIndexes = [];
    this.middleColumnIndexes = [];
  }

  ngOnInit(): void {
    this.loading = true;
    this.getData(this.currentPage, this.pageSize);
  }

  isLastRowContainer(index): boolean{
    return this.lastLineIndexes.indexOf(index) !== -1;
  }

  isMiddleColumn(index): boolean{
    return this.middleColumnIndexes.indexOf(index) !== -1;
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
        this.colors = data.colors;
        this.totalNumberOfPages = data.totalPages;
        this.currentPage = data.currentPage;
        // tslint:disable-next-line:no-conditional-assignment
        // @ts-ignore
        const n = this.colors.length;
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
        }
        this.loading = false;
      }, error => {
        console.error(error);
      });
  }



}
