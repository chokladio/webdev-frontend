import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedDaysService {
  selectedDays = [];

  add(formValues) {
    formValues.selections.map(val => {
      if(val.selected === true) {
        this.selectedDays.push(val)
      }
    });
  }

  getSelectedDays() {
    return this.selectedDays;
  }

  clear() {
    this.selectedDays=[];
  }

  constructor() { }
}
