import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { useReadingList } from "../context/ReadingListContext";

interface BookListProps {
  books: any[];
}

const placeholderImage = "url_to_placeholder_image"; // Replace with a valid placeholder URL

const BookList: React.FC<BookListProps> = ({ books }) => {
  const { addToReadingList } = useReadingList();

  return (
    <Grid container spacing={2}>
      {books.map((book: any) => (
        <Grid item xs={12} sm={6} md={4} key={book.title}>
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
                height: 150,
                boxShadow: 2,
                borderRadius: 1,
                mb: 1,
              }}
              src={require(`../${book.coverPhotoURL}`)}
              alt={`Cover of ${book.title}`}
            />
            <Typography variant="subtitle2" gutterBottom noWrap>
              {book.title}
            </Typography>
            <Typography variant="body2" gutterBottom noWrap>
              {`by ${book.author}`}
            </Typography>
            <Button
              size="small"
              variant="contained"
              onClick={() => addToReadingList(book)}
            >
              Add to Reading List
            </Button>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
