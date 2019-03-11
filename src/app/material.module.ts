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
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
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
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
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
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
],
 
})
 
export  class  MyMaterialModule { }