import React from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardActions,
} from "@mui/material";
import { useReadingList } from "../context/ReadingListContext";

interface BookListProps {
  books: any[];
}

const placeholderImage = "url_to_placeholder_image"; // Replace with a valid placeholder URL

const BookList: React.FC<BookListProps> = ({ books }) => {
  const { addToReadingList } = useReadingList();

  return (
    <Card sx={{ maxHeight: "80vh", overflowY: "auto", p: 1 }}>
      <Grid container spacing={0}>
        {books.map((book: any) => (
          <Grid item xs={12} sm={6} md={3} key={book.title}>
            
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 250,
                    width: 200,
                    boxShadow: 10,
                    borderRadius: 1,
                    mb: 1,
                  }}
                  src={require(`../${book.coverPhotoURL}`)}
                  alt={`Cover of ${book.title}`}
                />
                <Box sx={{ textAlign: "center", width: 200, flexGrow: 1 }}>
                  <Typography variant="body2" gutterBottom>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {`by ${book.author}`}
                  </Typography>
                </Box>
              </Box>
              <CardActions>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => addToReadingList(book)}
                >
                  Add to Reading List
                </Button>
              </CardActions>
            
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default BookList;
