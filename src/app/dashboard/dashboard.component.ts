import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertBoxComponent } from './alert-box/alert-box.component';
import { MatDialog } from '@angular/material';
import { SelectedDaysService} from '../selecteddays.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selections = {
    days: [
      { day: 'Monday', selected: false },
      { day: 'Tuesday', selected: false },
      { day: 'Wednesday', selected: false },
      { day: 'Thursday', selected: false },
      { day: 'Friday', selected: false },
      { day: 'Saturday', selected: false },
      { day: 'Sunday', selected: false },
    ]
  }

  submitted = false;
  form;

  constructor(private selectedDaysService : SelectedDaysService, private fb: FormBuilder, private router: Router,private dialog:MatDialog) {
    this.form = this.fb.group({
      days: this.buildDays()
    });
  }

  warn() {
    this.dialog.open(AlertBoxComponent);
  }


  onSubmit(form) {
    const formValue = Object.assign({}, form.value, {
      selections: form.days.map((selected, i) => {
        return {
          day: this.selections.days[i].day,
          selected
        }
      })
    });
    this.selectedDaysService.clear();
    this.selectedDaysService.add(formValue);
    //If atleast one box is checked:
    if (formValue.selections.some(day => day.selected)) {
      this.router.navigate(['/weekview'])
    } else {
      this.warn();
    }
    console.log(formValue);
  }

  get days() {
    return this.form.get('days');
  }

  buildDays() {
    const arr = this.selections.days.map(day => {
      return this.fb.control(day.selected)
    });
    return this.fb.array(arr);
  }

  ngOnInit() {
    console.log("test");
  }
  get diagnostic() {
    return JSON.stringify(this.days);
  }
}
