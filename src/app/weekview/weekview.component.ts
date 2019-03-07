import { Component, OnInit } from '@angular/core';
import { SelectedDaysService } from '../selecteddays.service';

@Component({
  selector: 'app-weekview',
  templateUrl: './weekview.component.html',
  styleUrls: ['./weekview.component.scss']
})
export class WeekviewComponent implements OnInit {
  selectedDays = []

  constructor(private sds:SelectedDaysService) { }

  ngOnInit() {
    this.sds.getSelectedDays().map(val => this.selectedDays.push(val));
    console.log(this.selectedDays);
  }

}
