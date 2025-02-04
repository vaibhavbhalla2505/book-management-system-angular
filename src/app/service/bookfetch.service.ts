import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map,of } from 'rxjs';
import { Book } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class BookfetchService {
  private apiBooks:Book[] | null=null;
  private BookToEdit:Book | null = null;
  private bookIndex:number | null = null;

  private url = 'https://www.googleapis.com/books/v1/volumes?q=genre:fiction+biography+history+novel';

  constructor(private http:HttpClient) { }

    private fetchApiBooks(): Observable<Book[]> {
      return this.http.get<any>(this.url).pipe(
        map((response) =>
          response.items
            .filter(
              (data: any) =>
                  data.volumeInfo.title &&
                  data.volumeInfo.authors &&
                  data.volumeInfo.categories &&
                  data.volumeInfo.industryIdentifiers &&
                  data.saleInfo.listPrice?.amount &&
                  data.saleInfo?.retailPrice?.amount &&
                  data.volumeInfo.industryIdentifiers[0].identifier.length === 13 &&
                  data.volumeInfo.publishedDate
            )
            .map((data: any) => ({
              title: data.volumeInfo.title,
              author: data.volumeInfo.authors[0],
              genre: data.volumeInfo.categories[0].toLowerCase(),
              isbn: data.volumeInfo.industryIdentifiers[0].identifier,
              date: data.volumeInfo.publishedDate,
              price: data.saleInfo.listPrice.amount,
              discountPrice: data.saleInfo.retailPrice.amount,
            }))
        )
      );
    }
  
    getbooks(): Observable<Book[]> {
      if (this.apiBooks) {
        return of([...this.apiBooks]);
      } else {
        return this.fetchApiBooks().pipe(
          map((apiBooks) => {
            this.apiBooks = apiBooks;
            return [...this.apiBooks];
          })
        );
      }
    }
  addbook(book:Book):void{
    if (this.bookIndex !== null) {
      this.apiBooks?.splice(this.bookIndex, 0, book);
      this.bookIndex = null;
    } else {
      this.apiBooks?.push(book);
    } 
    alert('Book added successfully');
  }

  setEditBook(book:Book,i:number):void{
    this.BookToEdit=book;
    this.bookIndex=i;
    this.apiBooks?.splice(i,1);
  }
  getEditBook():Book | null{
    return this.BookToEdit;
  }
  clearEdit():void{
    this.BookToEdit=null;
  }
  deleteBook(i:number):void{
    if(this.apiBooks){
      this.apiBooks.splice(i,1);
    }
    alert("Book deleted successfully");
  }
}
