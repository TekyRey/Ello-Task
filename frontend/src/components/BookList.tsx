import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Fab,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import { useReadingList } from "../context/ReadingListContext";
import AddIcon from "@mui/icons-material/Add";

interface BookListProps {
  books: any[];
}

const placeholderImage = "url_to_placeholder_image"; // Replace with a valid placeholder URL

const BookList: React.FC<BookListProps> = ({ books }) => {
  const { readingList, addToReadingList } = useReadingList();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddToReadingList = (book: any) => {
    const addedSuccessfully = addToReadingList(book);
    if (!addedSuccessfully) {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Card sx={{ maxHeight: "80vh", overflowY: "auto", p: 1 }}>
      <Grid container spacing={0}>
        {books.map((book: any) => (
          <Grid item xs={12} sm={6} md={3} key={book.title}>
            <Card
              sx={{
                position: "relative",
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
                color: "secondary",
                bgcolor: "background.default",
                variant: "outlined",
              }}
            >
              <Box
                component="img"
                sx={{
                  height: 250,
                  boxShadow: 10,
                  borderRadius: 1,
                  mb: 1,
                }}
                src={require(`../${book.coverPhotoURL}`)}
                alt={`Cover of ${book.title}`}
              />
              <Box sx={{ width: 180, textAlign: "center", px: 2 }}>
                <Typography variant="body2" gutterBottom>
                  {book.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {`by ${book.author}`}
                </Typography>
              </Box>
              <Tooltip title="Add to reading list">
                <Fab
                  color="success"
                  size="small"
                  onClick={() => handleAddToReadingList(book)}
                  sx={{
                    position: "absolute",
                    bottom: -20, // Half inside, half outside
                    right: -10,
                    zIndex: 1,
                  }}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="warning">
          Book is already on your reading list!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default BookList;
