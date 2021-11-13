// export interface IBook {
//     bookId: string;
//     title: string;
//     description: string;

import { IPagination, IPagingParams } from "./pagination"

//   }
export interface Book {
  bookId: string;
  title: string;
  description: string;
  categoryId: string;
  category: string;
  //pictureUrl: string;
}
  
export  type BookState = {
    books: Book[],
    loading: boolean,
    submitting: boolean,
    selectedBook: Book | undefined,
    errorMessage: string[] | undefined,
    pagination: IPagination | null,
    pagingParams: IPagingParams
  }
  
export  type BookAction = {
    type: string
    payload: any 
}

export  type DispatchType = (args: BookAction) => BookAction