import { NgModule } from  '@angular/core';

import {
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatListModule,
    MatSidenavModule
} from  '@angular/material';


@NgModule({
imports: [
    MatDialogModule,
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule
],
exports: [
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule
],

})

export  class  MyMaterialModule { }
