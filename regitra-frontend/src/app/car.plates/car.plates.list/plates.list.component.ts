import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CarPlate } from 'src/app/models/car.plate';
import { MatTableDataSource } from '@angular/material/table';
import { CarPlatesService } from 'src/app/services/car.plates.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PlatesEditComponent } from '../car.plates.edit/plates.edit.component';

@Component({
  selector: 'app-plates-list',
  templateUrl: './plates.list.component.html',
  styleUrls: ['./plates.list.component.scss']
})
export class PlatesListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns = ['number', 'owner', 'update', 'delete'];
  public dataSource = new MatTableDataSource<CarPlate>();
  public plate: CarPlate;
  public plates: CarPlate[];
  reactiveForm: any = FormGroup;

  constructor(private service: CarPlatesService, private fb: FormBuilder,
              private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getPlateList();
    this.reactiveForm = this.fb.group({
      owner: new FormControl('', [Validators.required, Validators.compose([Validators.minLength(2)])]),
      number: new FormControl('', [Validators.required, Validators.compose([Validators.minLength(6)])]),
    });
  }

  public getPlateList() {
    this.service.getAll().subscribe(res => {
      this.dataSource.data = res as CarPlate[];
      this.plates = res as CarPlate[];
    });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public addNewPlate() {
    const dialogConfig =  new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';
    this.dialog.open(PlatesEditComponent, dialogConfig);
  }

  selectedItem(number: string) {
    this.plate = this.plates.find(x => x.number === number);
  }

}
