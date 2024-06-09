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
  const { addToReadingList } = useReadingList();
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
            <Box
              sx={{
                position: "relative",
                mb: 3,
                ml: 3,
                overflow: "visible",
              }}
            >
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
                  color: "secondary",
                  bgcolor: "background.default",
                  variant: "outlined",
                  overflow: "visible", // Ensure overflow is visible
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
                        adding: "8px", 
                        borderRadius: "4px", 
                      },
                    },
                    arrow: {
                      sx: {
                        color: "primary.main", // Match arrow color to tooltip
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
                      bottom: -15, // Adjust to be half inside and half outside
                      right: -15,
                      zIndex: 2, // Ensure it is on top
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
