import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  IconButton,
  CardMedia,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Divider,
} from "@mui/material";
import { useReadingList } from "../context/ReadingListContext";
import DeleteIcon from "@mui/icons-material/Delete";

const ReadingList: React.FC = () => {
  const { readingList, removeFromReadingList } = useReadingList();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  const handleDeleteClick = (title: string) => {
    setSelectedBook(title);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedBook) {
      removeFromReadingList(selectedBook);
      setSelectedBook(null);
      setOpenDialog(false);
      setOpenSnackbar(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBook(null);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Card sx={{ maxHeight: "80vh", overflowY: "auto", p: 1 }}>
        <Typography variant="h6" mb={1}>
          Reading List
        </Typography>
        {readingList.length === 0 ? (
          <Typography>Your reading list will appear here.</Typography>
        ) : (
          readingList.map((book) => (
            <Box
              key={book.title}
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                mb: 2,
                p: 1,
                borderRadius: 1,
                border: 1,
                borderColor: "grey.300",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 50, height: 75, mr: 2, borderRadius: 1 }}
                image={require(`../${book.coverPhotoURL}`)}
                alt={`Cover of ${book.title}`}
              />
              <Box
                sx={{
                  flexGrow: 1,
                  overflow: "hidden",
                  mr: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                  {book.title}
                </Typography>
                <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                  {`by ${book.author}`}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ mr: 4 }} />
              <IconButton
                size="small"
                color="error"
                sx={{
                  position: "absolute",
                  right: 8, // Ensure consistent positioning
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                onClick={() => handleDeleteClick(book.title)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))
        )}
      </Card>
      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this book from your reading list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Book removed successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReadingList;
