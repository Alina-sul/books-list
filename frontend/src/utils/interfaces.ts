// API
export interface APIResponse {
  status: string;
  data: any;
  message: string;
  // Allow any other properties
  [key: string]: any;
}

// Books
export interface Book {
  title: string;
  author: string;
  book_image: string;
  // Allow any other properties
  [key: string]: any;
}

export interface BooksList {
  books: Book[];
}
