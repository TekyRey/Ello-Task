import React, { useState, useEffect } from "react";
import "./index.css";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import ReadingList from "./components/ReadingList";
import { Box, Grid, Avatar, Button, Modal, useMediaQuery } from "@mui/material";
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
    <Box
      sx={{
        padding: { xs: 2, md: 4 },
        overflow: "hidden",
        maxWidth: "100%", // Prevent horizontal overflow
        boxSizing: "border-box",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Box
            mt={2}
            sx={{
              overflow: "hidden",
            }}
          >
            <Box
              mb={2}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
                padding: { xs: 1, md: 2 },
              }}
            >
              <Avatar
                src={require("./assets/ello.png")}
                sx={{ width: { xs: 50, md: 70 }, height: { xs: 50, md: 70 } }}
              />
              <Box sx={{ flex: 1 }}>
                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  setSelectedBook={setSelectedBook}
                />
              </Box>
            </Box>
            {isMobileOrTablet && (
              <Button
                variant="contained"
                color="success"
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
        <Grid item xs={12} md={3}>
          {!isMobileOrTablet && (
            <Box
              sx={{
                position: "sticky",
                top: 20,
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              <ReadingList />
            </Box>
          )

          }
        </Grid>
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
              bgcolor: "background.default",
              boxShadow: 24,
              p: 4,
              borderRadius: 1,
            }}
          >
            <ReadingList />
            <Button
              color="error"
              onClick={handleCloseModal}
              sx={{ mt: 2, bgcolor: "background.paper" }}
            >
              Close
            </Button>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default App;
