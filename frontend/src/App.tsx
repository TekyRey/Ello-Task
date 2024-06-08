import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import ReadingList from "./components/ReadingList";
import { Box, Container, Typography, Grid } from "@mui/material";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Container maxWidth={false} disableGutters>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Box mt={3}>
            <Typography variant="h4" mb={3}>
              Book Search
            </Typography>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <BookList searchTerm={searchTerm} />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <ReadingList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
