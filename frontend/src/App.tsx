import React, { useState, useEffect } from "react";
import "./index.css";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import ReadingList from "./components/ReadingList";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Button,
  useMediaQuery,
  Modal,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "./services/graphqlQueries";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const { data, loading, error } = useQuery(GET_BOOKS);
  const isMobileOrTablet = useMediaQuery("(max-width: 768px)");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (data) {
      const books = data.books;
      const results = books.filter((book: any) =>
        `${book.title.toLowerCase()} ${book.author.toLowerCase()}`.includes(
          searchTerm.toLowerCase()
        )
      );
      setFilteredBooks(results);
    }
  }, [data, searchTerm]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Box mt={2}>
            <Avatar src={require("./assets/ello.png")} sx={{ width: 70 }} />
            <Box mb={2}>
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setSelectedBook={setSelectedBook}
              />
            </Box>
            {isMobileOrTablet && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenModal}
                sx={{ mt: 2, mb: 2 }}
              >
                View Reading List
              </Button>
            )}
            <BookList
              books={
                selectedBook
                  ? [selectedBook]
                  : filteredBooks.length > 0
                  ? filteredBooks
                  : data.books
              }
            />
          </Box>
        </Grid>
        {!isMobileOrTablet && <ReadingList />}
      </Grid>
      {isMobileOrTablet && (
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
            <ReadingList />
            <Button onClick={handleCloseModal} sx={{ mt: 2 }}>
              Close
            </Button>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default App;
