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
    MatChipsModule,
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
    MatChipsModule,
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
    MatChipsModule,
],
 
})
 
export  class  MyMaterialModule { }