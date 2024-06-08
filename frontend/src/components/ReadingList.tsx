import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useReadingList } from "../context/ReadingListContext";

const ReadingList: React.FC = () => {
  const { readingList, removeFromReadingList } = useReadingList();

  return (
    <Box>
      <Typography variant="h5">Reading List</Typography>
      {readingList.map((book) => (
        <Box key={book.title} mb={2}>
          <Typography variant="h6">{book.title}</Typography>
          <Typography variant="subtitle1">{book.author}</Typography>
          <Button
            variant="contained"
            onClick={() => removeFromReadingList(book.title)}
          >
            Remove
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default ReadingList;
