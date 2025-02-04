import { Routes } from '@angular/router';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { BookTableComponent } from './book-table/book-table.component';
import { HomepageComponent } from './homepage/homepage.component';
export const routes: Routes = [
    {path: '', component: HomepageComponent},
  { path: 'add-book', component: FormInputsComponent }, 
  { path: 'book-details', component: BookTableComponent }
];
