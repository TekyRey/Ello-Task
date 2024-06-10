import React, { createContext, useState, useContext } from "react";

interface Book {
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
}

interface ReadingListContextType {
  readingList: Book[];
  addToReadingList: (book: Book) => boolean; // Return a boolean indicating success or failure
  removeFromReadingList: (title: string, author: string) => void;
}

const ReadingListContext = createContext<ReadingListContextType | undefined>(
  undefined
);

export const ReadingListProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [readingList, setReadingList] = useState<Book[]>([]);

  const addToReadingList = (book: Book): boolean => {
    if (
      readingList.some(
        (item) => item.title === book.title && item.author === book.author
      )
    ) {
      return false; // Book already exists
    }
    setReadingList((prevList) => [...prevList, book]);
    return true; // Book added successfully
  };

  const removeFromReadingList = (title: string, author: string) => {
    setReadingList((prevList) =>
      prevList.filter(
        (book) => !(book.title === title && book.author === author)
      )
    );
  };

  return (
    <ReadingListContext.Provider
      value={{ readingList, addToReadingList, removeFromReadingList }}
    >
      {children}
    </ReadingListContext.Provider>
  );
};

export const useReadingList = () => {
  const context = useContext(ReadingListContext);
  if (!context) {
    throw new Error("useReadingList must be used within a ReadingListProvider");
  }
  return context;
};
