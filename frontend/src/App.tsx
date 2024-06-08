import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import ReadingList from "./components/ReadingList";
import { Box, Container, Typography } from "@mui/material";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Book Assignment View
      </Typography>
      <Box mb={4}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Box>
      <Box mb={4}>
        <BookList searchTerm={searchTerm} />
      </Box>
      <ReadingList />
    </Container>
  );
};

export default App;
