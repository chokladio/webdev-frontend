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
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatSidenavModule,
    MatChipsModule
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
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatSidenavModule,
    MatChipsModule
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
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatSidenavModule,
    MatChipsModule
],

})

export  class  MyMaterialModule { }
