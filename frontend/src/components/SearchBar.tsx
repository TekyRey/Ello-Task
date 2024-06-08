import React from "react";
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
} from "@mui/material";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

interface Book {
  title: string;
  coverPhotoURL: string;
  author: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const { data } = useQuery(GET_BOOKS);

  const handleInputChange = (event: any, newInputValue: string) => {
    setSearchTerm(newInputValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Autocomplete
        freeSolo
        options={data ? data.books : []}
        getOptionLabel={(option: string | Book) =>
          typeof option === "string" ? option : option.title
        }
        onInputChange={handleInputChange}
        renderOption={(props, option: Book) => (
          <ListItem {...props} sx={{ alignItems: "flex-start" }}>
            <ListItemAvatar>
              <CardMedia
                component="img"
                sx={{ width: 40, height: 60, mr: 1, borderRadius: 1 }}
                image={require(`../${option.coverPhotoURL}`)}
                alt={`Cover of ${option.title}`}
              />
            </ListItemAvatar>
            <ListItemText
              primary={option.title}
              secondary={
                <Typography component="span">{option.author}</Typography>
              }
            />
          </ListItem>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search books"
            variant="outlined"
            sx={{
              width: 500, // Adjust the width to be similar to Google's search bar
              ".MuiOutlinedInput-root": {
                borderRadius: "25px", // Rounded corners
                paddingRight: 0,
                "&.Mui-focused": {
                  boxShadow: "0 1px 6px 0 rgba(32,33,36,0.28)", // Shadow similar to Google's search bar
                  borderColor: "rgba(223,225,229,0)",
                },
              },
              ".MuiOutlinedInput-input": {
                padding: "10px 20px", // Padding inside the input field
              },
            }}
          />
        )}
      />
    </Box>
  );
};

export default SearchBar;
