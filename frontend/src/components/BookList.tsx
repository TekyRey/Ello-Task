import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../services/graphqlQueries";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
} from "@mui/material";
import { useReadingList } from "../context/ReadingListContext";
import ReadingList from "./ReadingList";
interface BookListProps {
  searchTerm: string;
}

const placeholderImage = "url_to_placeholder_image"; // Replace with a valid placeholder URL

const BookList: React.FC<BookListProps> = ({ searchTerm }) => {
  const { data, loading, error } = useQuery(GET_BOOKS);
  const { addToReadingList } = useReadingList();
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredBooks = data.books.filter((book: any) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageError = (title: string) => {
    setImageError((prev) => ({ ...prev, [title]: true }));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Grid container spacing={3}>
          {filteredBooks.map((book: any) => (
            <Grid item xs={12} sm={6} md={4} key={book.title}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: 250 }}
                  image={require(`../${book.coverPhotoURL}`)}
                  alt={`Cover of ${book.title}`}
                  onError={() => handleImageError(book.title)}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">{book.title}</Typography>
                  <Typography variant="body2">{`by ${book.author}`}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    onClick={() => addToReadingList(book)}
                  >
                    Add to Reading List
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <ReadingList />
      </Grid>
    </Grid>
  );
};

export default BookList;
