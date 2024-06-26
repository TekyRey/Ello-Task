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

const BookList: React.FC<BookListProps> = ({ books }) => {
  const { addToReadingList } = useReadingList();
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "warning" | "error",
  });

  const handleAddToReadingList = (book: any) => {
    const addedSuccessfully = addToReadingList(book);
    if (addedSuccessfully) {
      setSnackbarState({
        open: true,
        message: "Book added to reading list!",
        severity: "success",
      });
    } else {
      setSnackbarState({
        open: true,
        message: "Book is already on your reading list!",
        severity: "warning",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarState((prevState) => ({ ...prevState, open: false }));
  };

  return (
    <Card sx={{ maxHeight: "77vh", overflowY: "auto", p: 3 }}>
      <Grid container spacing={2}>
        {books.map((book: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={`${book.title}-${book.author}`}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
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
                  bgcolor: "background.default",
                  variant: "outlined",
                  overflow: "visible",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 250,
                    objectFit: "cover",
                    width: "100%",
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
                <Tooltip
                  title="Add to reading list"
                  arrow
                  componentsProps={{
                    tooltip: {
                      sx: {
                        fontSize: "14px",
                        backgroundColor: "primary.main",
                        color: "success.main",
                        fontWeight: 600,
                        padding: "8px",
                        borderRadius: "4px",
                      },
                    },
                    arrow: {
                      sx: {
                        color: "primary.main",
                      },
                    },
                  }}
                >
                  <Fab
                    color="success"
                    size="small"
                    onClick={() => handleAddToReadingList(book)}
                    sx={{
                      position: "absolute",
                      bottom: -15,
                      right: -15,
                      zIndex: 2,
                    }}
                  >
                    <AddIcon />
                  </Fab>
                </Tooltip>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarState.severity}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default BookList;
