import React from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
} from "@mui/material";
import { useReadingList } from "../context/ReadingListContext";
// import DeleteIcon from "@mui/icons-material/Delete";

const ReadingList: React.FC = () => {
  const { readingList, removeFromReadingList } = useReadingList();

  return (
    <Box sx={{ maxHeight: "80vh", overflowY: "auto" }}>
      <Typography variant="h5" mb={2}>
        Reading List
      </Typography>
      {readingList.length === 0 ? (
        <Typography>Your reading list will appear here.</Typography>
      ) : (
        readingList.map((book) => (
          <Card
            key={book.title}
            sx={{ display: "flex", mb: 2, alignItems: "center" }}
          >
            <CardMedia
              component="img"
              sx={{ width: 50, height: 75, marginRight: 1 }}
              image={require(`../${book.coverPhotoURL}`)}
              alt={`Cover of ${book.title}`}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2">{book.title}</Typography>
              <Typography variant="body2">{`by ${book.author}`}</Typography>
            </CardContent>
            <IconButton
              color="secondary"
              onClick={() => removeFromReadingList(book.title)}
            >
              {/* <DeleteIcon /> */}
            </IconButton>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ReadingList;
