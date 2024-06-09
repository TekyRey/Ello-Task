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
          <Card 
          sx= {{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: 1,
            boxShadow: 10,
            borderRadius: 1,
            height: 330,
            width: 200,
            mb: 3,
            ml: 3,
            color: 'secondary',
            bgcolor: 'background.default',
            variant: 'outlined',
          
          }}
          key={book.title}>
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
                    // width: 200,
                    boxShadow: 10,
                    borderRadius: 1,
                    mb: 1,
                  }}
                  src={require(`../${book.coverPhotoURL}`)}
                  alt={`Cover of ${book.title}`}
                />
                <Box sx={{ width: 200, flexGrow: 1 }}>
                  <Typography variant="body2" gutterBottom>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {`by ${book.author}`}
                  </Typography>
                </Box>
              </Box>
              <CardActions>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexGrow: 1,
                  }}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    // fullWidth
                    onClick={() => addToReadingList(book)}
                  >
                    Add to Reading List
                  </Button>
                </Box>
              </CardActions>
            </Grid>
          </Card>
        ))}
      </Grid>
    </Card>
  );
};

export default BookList;
