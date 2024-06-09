import React, { useState, useEffect } from "react";
import './index.css';
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import ReadingList from "./components/ReadingList";
import { Box, Typography, Grid } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "./services/graphqlQueries";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const { data, loading, error } = useQuery(GET_BOOKS);

  useEffect(() => {
    if (data) {
      const books = data.books;
      const results = books.filter((book: any) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(results);
    }
  }, [data, searchTerm]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Box mt={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <Typography variant="h4">Book Finder</Typography>
             
            </Box>
            <Box mb={2}>
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </Box>
            <BookList
              books={filteredBooks.length > 0 ? filteredBooks : data.books}
            />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <ReadingList />
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
