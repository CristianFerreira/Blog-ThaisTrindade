import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-load-info',
  templateUrl: './load-info.component.html',
  styleUrls: ['./load-info.component.css']
})
export class LoadInfoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoadInfoComponent>) { }

  ngOnInit() {
  }

}
