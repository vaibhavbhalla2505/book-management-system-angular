import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

export interface Book{
  title: string;
  author: string;
  isbn: string;
  genre: string;
  date: string;
  price?: number;
  discountPrice?: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HttpClientModule,RouterOutlet],
  standalone: true
})
export class AppComponent {
}
