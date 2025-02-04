import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Book } from '../app.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavbarComponent } from "../navbar/navbar.component";
import { BookfetchService } from '../service/bookfetch.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-table',
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './book-table.component.html',
})

export class BookTableComponent {
  books: Book[] = [];
  allBooks: Book[] = [];
  searchValue: string = '';
  selectedGenre: String = '';
  sortSelect: String = '';
  
  constructor(
    private sanitizer: DomSanitizer,
    private bookService: BookfetchService,
    private router: Router
  ) {}

  ngOnInit() {
    this.bookService.getbooks().subscribe(
      (fetchBooks) => {
        this.allBooks = [...fetchBooks];
        this.books = fetchBooks;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  standardGenre: string[] = [
    "fiction", "non-fiction", "biography", "history", "politics", "science", "novel"
  ];

  //calculate the age of book
  calculateAge = (date: string): string => {
    let pubYear = date.substring(0, 4);
    let pubMonth = date.substring(5, 7);
    let pubDay = date.substring(8, 10);

    let today = new Date();
    let currentDate = today.getDate();
    let currentMonth = today.getMonth() + 1;
    let currentYear = today.getFullYear();

    if (currentYear - parseInt(pubYear) > 0) {
      return `${currentYear - parseInt(pubYear)} years ago`;
    } else if (currentMonth - parseInt(pubMonth) > 0) {
      return `${currentMonth - parseInt(pubMonth)} months ago`;
    } else {
      return `${currentDate - parseInt(pubDay)} days ago`;
    }
  }

  // Discount price calculation
  discountCalculation = (actualP: number | undefined, discountP: number | undefined): SafeHtml => {
    if (actualP === undefined && discountP === undefined) {
      actualP = 0;
      discountP = 0;
    }

    actualP = actualP ?? 0;
    discountP = discountP ?? 0;

    const percentage = (discountP / actualP) * 100;
    const discountPercentage = 100 - percentage;

    if (actualP !== discountP) {
      const html = `
        <span class="line-through text-blue-600 font-semibold">${actualP.toFixed()} rs/- </span>
        <span class="font-medium text-red-600">(${discountPercentage.toFixed()}% off)</span>
        <span class="font-bold text-green-600">${discountP.toFixed()} rs/-</span>
      `;
      return this.sanitizer.bypassSecurityTrustHtml(html); 
    } else {
      const html = `<span class="text-green-600 font-bold">${actualP.toFixed()} rs/- </span>`;
      return this.sanitizer.bypassSecurityTrustHtml(html); 
    }
  }

  editBook(book: Book, i: number): void {
    this.bookService.setEditBook(book, i);
    this.router.navigate(['/add-book']);
  }

  deleteBook(i: number): void {
    this.bookService.deleteBook(i);
    this.books.splice(i, 1);
  }

  // Search function with filter
  searchAndFilterBooks(): void {
    let filteredBooks = this.allBooks;
  
    if (this.selectedGenre === "other") {
      filteredBooks = filteredBooks.filter(book => !this.standardGenre.includes(book.genre));
    } else if (this.selectedGenre) {
      filteredBooks = filteredBooks.filter(book => book.genre === this.selectedGenre);
    }
  
    if (this.searchValue) {
      const searchQuery = this.searchValue.toLowerCase();
      filteredBooks = filteredBooks.filter(book => book.title.toLowerCase().includes(searchQuery));
    }
  
    this.books = [...filteredBooks];
  
    if (this.books.length < 1) {
      alert('No books found.');
    }
  }
  

  // Clear search and filter
  clearBook(): void {
    this.books = [...this.allBooks]; 
    this.searchValue = '';
    this.selectedGenre = '';
    this.sortSelect = '';
  }

  // Sort books by title
  sortByTitle(): void {
    if (this.sortSelect === 'asc') {
      const filterData = this.books.sort((a, b) => a.title.localeCompare(b.title));
      this.books = filterData;
    } else {
      const filterData = this.books.sort((a, b) => b.title.localeCompare(a.title));
      this.books = filterData;
    }
  }
}
