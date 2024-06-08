import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../services/graphqlQueries";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const { data } = useQuery(GET_BOOKS);

  return (
    <Autocomplete
      freeSolo
      options={data ? data.books.map((book: { title: any; }) => book.title) : []}
      onInputChange={(event, newInputValue) => {
        setSearchTerm(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Books"
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
        />
      )}
    />
  );
};

export default SearchBar;
