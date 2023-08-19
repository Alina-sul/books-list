import React from "react";
import {useQuery} from "react-query";

// Constants
import { APIResponse } from "utils/interfaces";
// API
import { getBooks } from "api/books";

const BooksList = () => {
  const count = 10; // Replace with your desired count
  const { data, isLoading, isError } = useQuery<APIResponse, Error, APIResponse, [string, number]>(
      ['books', count],
      getBooks
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error fetching books</div>;
  }

  const {data: {books}} = data;
  console.log(books);
  return <div></div>;
};

export default BooksList;
