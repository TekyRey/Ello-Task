import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../services/graphqlQueries";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useReadingList } from "../context/ReadingListContext";

interface BookListProps {
  searchTerm: string;
}

const placeholderImage = "url_to_placeholder_image"; // Replace with a valid placeholder URL

const BookList: React.FC<BookListProps> = ({ searchTerm }) => {
  const { data, loading, error } = useQuery(GET_BOOKS);
  const { addToReadingList } = useReadingList();
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredBooks = data.books.filter((book: any) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageError = (title: string) => {
    setImageError((prev) => ({ ...prev, [title]: true }));
  };

  return (
    <Box>
      {filteredBooks.map((book: any) => (
        <Card key={book.title} sx={{ display: "flex", mb: 2 }}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            // image={require("../assets/image1.webp")}
            image={require(`../${book.coverPhotoURL}`)}
            alt={`Cover of ${book.title}`}
            onError={() => handleImageError(book.title)}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent>
              <Typography variant="h6">{book.title}</Typography>
              <Typography variant="subtitle1">{book.author}</Typography>
              <Button
                variant="contained"
                onClick={() => addToReadingList(book)}
              >
                Add to Reading List
              </Button>
            </CardContent>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default BookList;
