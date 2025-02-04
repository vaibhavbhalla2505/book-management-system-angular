import { Component,NgModule} from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';    
import { Book } from '../app.component';
import { NavbarComponent } from "../navbar/navbar.component";
import { BookfetchService } from '../service/bookfetch.service';
import { RouterLink,Router } from '@angular/router';
@Component({
  selector: 'app-form-inputs',
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './form-inputs.component.html',
})
export class FormInputsComponent {
  book:Book={
    title: "",
    author: "",
    genre: "",
    date: "",
    isbn: "",
    price: undefined,
    discountPrice: undefined,
  }
  constructor(private bookService:BookfetchService,private router:Router){}

  customGenre: string = "";
  standardGenre: string[] = ["fiction","non-fiction", "biography", "history",
    "politics", "science", "novel"];
    showCustomGenre = false;
    
    ngOnInit(): void {
      const bookToEdit = this.bookService.getEditBook();
      if (bookToEdit) {
        this.book = bookToEdit;
        this.bookService.clearEdit();

        if(!this.standardGenre.includes(this.book.genre)){
          this.book.genre='other';
        }
        else
          this.customGenre = '';

        this.customGenre = this.showCustomGenre ? this.book.genre : '';
      }
    }
  addCustomGenre(event: Event): void {
    const selectedGenre= (event.target as HTMLSelectElement).value;
    this.showCustomGenre = selectedGenre === 'other';
  }

  onSubmit():boolean{
    if(!this.book.title) {
      alert('Please fill the title of the book');
      return false;
    }
    if(!this.book.author) {
      alert('Please enter the author name');
      return false;
    }
    if(!this.book.genre) {
      alert('Please select a genre');
      return false;
    }
    if(this.book.genre === "other" && !this.customGenre) {
      alert('Please enter a custom genre');
      return false;
    }

    let today = new Date();
      let currentDate = today.getDate();
      let currentMonth = today.getMonth() + 1;
      let currentYear = today.getFullYear();

      let pubYear = parseInt(this.book.date.substring(0, 4));
      let pubMonth = parseInt(this.book.date.substring(5, 7));
      let pubDay = parseInt(this.book.date.substring(8, 10));

      if(currentYear < pubYear) {
          alert('Please enter the correct date');
          return false;
      }
      if(currentYear === pubYear && currentMonth < pubMonth) {
          alert('Please enter the correct date');
          return false;
      }
      if(currentYear === pubYear && currentMonth === pubMonth && currentDate < pubDay) {
          alert('Please enter the correct date');
          return false;
      }
      if (isNaN(Number(this.book.isbn)) || this.book.isbn.length !== 13) {
        alert('Please enter a valid ISBN-13 number');
        return false;
      }

      if(this.book.genre=='other' && this.customGenre)
        this.book.genre = this.customGenre;

      if(this.customGenre)
        this.showCustomGenre=true;
      
      this.bookService.addbook(this.book);
      
      this.resetForm();
      this.router.navigate(['/book-details']);
      return true;
  }
  resetForm(): void {
    this.book = { title: '', author: '', isbn: '', genre: '', date: ''};
    this.customGenre='';
    this.showCustomGenre = false;
  }
}
