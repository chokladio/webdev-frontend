import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedDaysService {
  selectedDays = [];

  add(formValues) {
    formValues.selections.map(val => this.selectedDays.push(val));
  }

  getSelectedDays() {
    return this.selectedDays;
  }

  clear() {
    this.selectedDays=[];
  }

  constructor() { }
}
