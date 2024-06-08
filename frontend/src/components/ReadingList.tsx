import React from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { useReadingList } from "../context/ReadingListContext";

const ReadingList: React.FC = () => {
  const { readingList, removeFromReadingList } = useReadingList();

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Reading List
      </Typography>
      {readingList.length === 0 ? (
        <Typography>Your reading list will appear here.</Typography>
      ) : (
        readingList.map((book) => (
          <Card key={book.title} sx={{ display: "flex", mb: 2 }}>
            <CardMedia
              component="img"
              sx={{ width: 50, height: 100 }}
              image={require(`../${book.coverPhotoURL}`)}
              alt={`Cover of ${book.title}`}
            />
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="subtitle2">{book.title}</Typography>
              <Typography variant="body2">{`by ${book.author}`}</Typography>
              <Button
                variant="contained"
                onClick={() => removeFromReadingList(book.title)}
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ReadingList;
