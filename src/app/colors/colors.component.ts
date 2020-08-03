import { Component, OnInit } from '@angular/core';
import {Color} from './color';
import {ColorsService} from './colors.service';
import {StateService} from '../state.service';
import {Router} from '@angular/router';
import {MatrixHelper} from '../utils/MatrixHelper';
import {ToastrService} from 'ngx-toastr';

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
  authData: any;
  okModalButtonText: string;
  modalTitle: string;

  constructor(private readonly colorsService: ColorsService,
              private readonly stateService: StateService,
              private readonly router: Router,
              private readonly toastr: ToastrService) {
    this.lastLineIndexes = [];
    this.middleColumnIndexes = [];
    this.newColor = {
      id: null,
      name: null,
      color: null,
      pantone: null,
      year: null
    };
    this.authData = this.stateService.getData('auth') as any;
    this.okModalButtonText = 'Crear';
    this.modalTitle = 'Crear Color';
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
        this.loading = false;
      }, error => {
        console.error(error);
        this.toastr.error('Error al obtener los colores', 'Error :(');
      });
  }

  saveColor(): void{
    this.loading = true;
    if (this.editing){
      this.colorsService.editColor(this.newColor)
        .subscribe(color => {
          this.hideModal('#createColorModal');
          this.loading = false;
          this.toastr.success('Color editado con éxito', 'Éxito :)');
          this.getData(this.currentPage, this.pageSize);
        }, error => {
          console.error(error);
          this.toastr.error('Error al editar el color', 'Error :(');
        });
    }else{
      this.colorsService.createColor(this.newColor)
        .subscribe(color => {
          this.hideModal('#createColorModal');
          this.loading = false;
          this.toastr.success('Color creado con éxito', 'Éxito :)');
          this.getData(this.currentPage, this.pageSize);
        }, error => {
          console.error(error);
          this.toastr.error('Error al crear el color', 'Error :(');
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

  canDelete(): boolean{
    return this.authData.role.name === 'administrator';
  }

  canEdit(): boolean{
    return this.authData.role.name === 'administrator';
  }

  canCreate(): boolean{
    return this.authData.role.name === 'administrator';
  }

  editColor(color: Color): void {
    this.editing = true;
    this.newColor = color;
    this.okModalButtonText = 'Editar';
    this.modalTitle = 'Editar Color';
    this.showModal('#createColorModal');
  }

  createColor(): void{
    this.editing = false;
    this.newColor = {
      id: null,
      name: null,
      color: null,
      pantone: null,
      year: null
    };
    this.modalTitle = 'Crear Color';
    this.okModalButtonText = 'Crear';
    this.showModal('#createColorModal');
  }

  deleteColor(color: Color): void {
    this.loading = true;
    this.colorsService.deleteColor(color)
      .subscribe(data => {
        console.log(data);
        this.loading = false;
        this.toastr.success('Color eliminado con éxito', 'Éxito :)');
        this.getData(this.currentPage, this.pageSize);
      }, error => {
        console.log(error);
        this.toastr.error('Error al eliminar el color', 'Error :(');
      });
  }



}
