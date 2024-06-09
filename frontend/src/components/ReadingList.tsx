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
  useMediaQuery,
  Modal,
} from "@mui/material";
import { useReadingList } from "../context/ReadingListContext";
import DeleteIcon from "@mui/icons-material/Delete";

const ReadingList: React.FC = () => {
  const { readingList, removeFromReadingList } = useReadingList();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState<{
    title: string;
    author: string;
  } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const isMobileOrTablet = useMediaQuery("(max-width: 768px)");

  const handleDeleteClick = (title: string, author: string) => {
    setSelectedBook({ title, author });
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedBook) {
      removeFromReadingList(selectedBook.title, selectedBook.author);
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

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const readingListContent = (
    <Box>
      <Typography variant="h6" mb={1}>
        Reading List
      </Typography>
      <Card sx={{ maxHeight: "80vh", overflowY: "auto", p: 1 }}>
        {readingList.length === 0 ? (
          <Typography>Your reading list will appear here.</Typography>
        ) : (
          readingList.map((book) => (
            <Box
              key={`${book.title}-${book.author}`}
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
                onClick={() => handleDeleteClick(book.title, book.author)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))
        )}
      </Card>
    </Box>
  );

  return (
    <>
      {isMobileOrTablet ? (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            sx={{ mb: 2 }}
          >
            View Reading List
          </Button>
          <Modal open={modalOpen} onClose={handleCloseModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "90%",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 1,
              }}
            >
              {readingListContent}
              <Button onClick={handleCloseModal} sx={{ mt: 2 }}>
                Close
              </Button>
            </Box>
          </Modal>
        </>
      ) : (
        readingListContent
      )}
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
