import React from "react";
import { Book as BookType } from "utils/interfaces";
import { Card } from "antd";

const { Meta } = Card;

const Book = (props: BookType) => {
  console.log("book");
  const { title, author, description, book_image: cover } = props;
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img height="360" width="240" alt={title} src={cover} />}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default Book;
