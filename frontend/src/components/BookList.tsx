import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../services/graphqlQueries";
import { Box, Button, Typography, Grid, Card } from "@mui/material";
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
    <Card sx={{ maxHeight: "80vh", overflowY: "auto", p: 1 }}>
      <Grid container spacing={3}>
        {filteredBooks.map((book: any) => (
          <Grid item xs={12} sm={6} md={3} key={book.title}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                sx={{
                  height: 250,
                  width: 200,
                  boxShadow: 3,
                  borderRadius: 1,
                  mb: 1,
                }}
                src={require(`../${book.coverPhotoURL}`)}
                alt={`Cover of ${book.title}`}
                onError={() => handleImageError(book.title)}
              />
              <Box sx={{ textAlign: "center", height: 200, width: 150 }}>
                <Typography variant="body2" gutterBottom>
                  {book.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {`by ${book.author}`}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToReadingList(book)}
                >
                  Add to Reading List
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default BookList;
