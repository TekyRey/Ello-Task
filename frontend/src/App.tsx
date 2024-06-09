import React, { useState, useEffect } from "react";
import "./index.css";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import ReadingList from "./components/ReadingList";
import {
  Box,
  Grid,
  Avatar,
  IconButton,
  useMediaQuery,
  Drawer,
  Typography,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "./services/graphqlQueries";
import MenuIcon from "@mui/icons-material/Menu";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const { data, loading, error } = useQuery(GET_BOOKS);
  const isMobileOrTablet = useMediaQuery("(max-width: 768px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box sx={{ padding: 2, position: "relative" }}>
      {isMobileOrTablet && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 1000,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
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
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <Typography variant="h6" sx={{ p: 2 }}>
              Reading List
            </Typography>
            <ReadingList />
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default App;
