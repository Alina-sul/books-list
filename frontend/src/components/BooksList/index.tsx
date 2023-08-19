import React, { useMemo } from "react";
import { useQuery } from "react-query";

// Components
import Book from "components/Book";
// Constants
import { APIResponse, Book as BookType } from "utils/interfaces";
// API
import { getBooks } from "api/books";
// Styles
import "./index.scss";

const BooksList = () => {
  const count = 10; // Replace with your desired count
  const { data, isLoading, isError } = useQuery<
    APIResponse,
    Error,
    APIResponse,
    [string, number]
  >(["books", count], getBooks);

  const booksList = useMemo(() => {
    const books = data?.data?.books as BookType[] | undefined;
    return books?.map(({ id, title, author, description, book_image }) => {
      return (
        <Book
          key={id}
          title={title}
          author={author}
          description={description}
          book_image={book_image}
          id={id}
        />
      );
    });
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error fetching books</div>;
  }

  return (
    <div className={"books-list"}>
      {booksList}
    </div>
  );
};

export default BooksList;
