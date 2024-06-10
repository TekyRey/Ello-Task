import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../services/graphqlQueries";
import {
  Box,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CardMedia,
  useMediaQuery,
} from "@mui/material";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setSelectedBook: (book: Book | null) => void;
}

interface Book {
  title: string;
  coverPhotoURL: string;
  author: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  setSelectedBook,
}) => {
  const { data } = useQuery(GET_BOOKS);
  const [options, setOptions] = useState<Array<string | Book>>([]);

  // Define media queries
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery((theme: any) =>
    theme.breakpoints.between("sm", "md")
  );

  useEffect(() => {
    if (data && data.books) {
      setOptions(data.books);
    }
  }, [data]);

  const handleInputChange = (event: any, newInputValue: string) => {
    setSearchTerm(newInputValue);
    if (data) {
      const filteredOptions = data.books.filter((book: Book) =>
        `${book.title.toLowerCase()} ${book.author.toLowerCase()}`.includes(
          newInputValue.toLowerCase()
        )
      );
      setOptions(filteredOptions);
    }
  };

  const handleOptionSelect = (
    event: any,
    selectedOption: string | Book | null
  ) => {
    if (typeof selectedOption === "object" && selectedOption !== null) {
      setSelectedBook(selectedOption);
    } else {
      setSelectedBook(null);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: { xs: 2, md: 4 },
        px: { xs: 2, md: 4 },
        width: "100%",
      }}
    >
      <Autocomplete
        freeSolo
        options={options}
        getOptionLabel={(option: string | Book) =>
          typeof option === "string"
            ? option
            : `${option.title} by ${option.author}`
        }
        onInputChange={handleInputChange}
        onChange={handleOptionSelect}
        renderOption={(props, option: Book | string) => {
          if (typeof option === "string") {
            return (
              <ListItem {...props} key={option}>
                <ListItemText primary={option} />
              </ListItem>
            );
          } else {
            return (
              <ListItem
                {...props}
                key={`${option.title}-${option.author}`}
                sx={{
                  background: "background.default",
                  alignItems: "flex-start",
                  p: 1,
                }}
              >
                <ListItemAvatar>
                  <CardMedia
                    component="img"
                    sx={{ width: 40, height: 60, mr: 2, borderRadius: 1 }}
                    image={require(`../${option.coverPhotoURL}`)}
                    alt={`Cover of ${option.title}`}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={option.title}
                  secondary={
                    <Typography component="span">{`by ${option.author}`}</Typography>
                  }
                />
              </ListItem>
            );
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search books"
            variant="outlined"
            sx={{
              width: isMobile ? "100%" : isTablet ? "80%" : 600,
              ".MuiOutlinedInput-root": {
                borderRadius: "50px",
                paddingRight: 0,
                "&.Mui-focused": {
                  boxShadow: "0 1px 6px 0 rgba(32,33,36,0.28)",
                  borderColor: "rgba(223,225,229,0)",
                },
              },
              ".MuiOutlinedInput-input": {
                padding: "12px 20px",
              },
            }}
          />
        )}
        PaperComponent={({ children }) => (
          <Box
            sx={{
              borderRadius: "10px",
              boxShadow: "0 1px 6px rgba(32,33,36,0.28)",
              marginTop: "20px",
              overflow: "hidden",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}
          >
            {children}
          </Box>
        )}
      />
    </Box>
  );
};

export default SearchBar;
