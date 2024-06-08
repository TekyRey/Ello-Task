import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../services/graphqlQueries";
import { Box, Button, Typography } from "@mui/material";
import { useReadingList } from "../context/ReadingListContext";

interface BookListProps {
  searchTerm: string;
}

const BookList: React.FC<BookListProps> = ({ searchTerm }) => {
  const { data, loading, error } = useQuery(GET_BOOKS);
  const { addToReadingList } = useReadingList();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredBooks = data.books.filter((book: any) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      {filteredBooks.map((book: any) => (
        <Box key={book.title} mb={2}>
          <Typography variant="h6">{book.title}</Typography>
          <Typography variant="subtitle1">{book.author}</Typography>
          <Button variant="contained" onClick={() => addToReadingList(book)}>
            Add to Reading List
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default BookList;
