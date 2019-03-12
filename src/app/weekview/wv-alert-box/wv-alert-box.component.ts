import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert-box',
  templateUrl: './wv-alert-box.component.html',
  styleUrls: ['./wv-alert-box.component.scss']
})
export class WVAlertBoxComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClick() {
    this.router.navigate(['/dashboard'])
  }

}
