import React from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  IconButton,
  CardMedia,
} from "@mui/material";
import { useReadingList } from "../context/ReadingListContext";
import DeleteIcon from "@mui/icons-material/Delete";

const ReadingList: React.FC = () => {
  const { readingList, removeFromReadingList } = useReadingList();

  return (
    <Card sx={{ 
        maxHeight: "80vh", overflowY: "auto", p: 1, color: 'primary' }}>
      <Typography variant="h6" mb={1}>
        Reading List
      </Typography>
      {readingList.length === 0 ? (
        <Typography>Your reading list will appear here.</Typography>
      ) : (
        readingList.map((book) => (
          <Box
            key={book.title}
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <CardMedia
              component="img"
              sx={{ width: 20, height: 30, mr: 1, borderRadius: 1 }}
              image={require(`../${book.coverPhotoURL}`)}
              alt={`Cover of ${book.title}`}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" noWrap>
                {book.title}
              </Typography>
              <Typography
                variant="body2"
                noWrap
              >{`by ${book.author}`}</Typography>
            </Box>
            <IconButton
              size="small"
              color="secondary"
              onClick={() => removeFromReadingList(book.title)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))
      )}
    </Card>
  );
};

export default ReadingList;
