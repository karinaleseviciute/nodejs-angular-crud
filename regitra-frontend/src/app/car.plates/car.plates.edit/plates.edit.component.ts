import { Component, OnInit, Input } from '@angular/core';
import { CarPlatesService } from 'src/app/services/car.plates.service';
import {MatDialogRef} from '@angular/material/dialog';
import { CarPlate } from 'src/app/models/car.plate';

@Component({
  selector: 'app-plates.edit',
  templateUrl: './plates.edit.component.html',
  styleUrls: ['./plates.edit.component.scss']
})
export class PlatesEditComponent implements OnInit {

  @Input() plate: CarPlate;

  constructor(private platesService: CarPlatesService,
              public dialogRef: MatDialogRef<PlatesEditComponent>) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }

  savePlate() {
    const data = {
      owner: this.plate.owner,
      number: this.plate.number
    };
    this.platesService.create(data).subscribe(res => {
      console.log(res);
    },
    err => {
      console.log(err);
    });
    this.onClose();
  }
}
