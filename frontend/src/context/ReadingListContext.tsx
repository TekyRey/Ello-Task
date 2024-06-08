import React, { createContext, useState, useContext } from "react";

interface Book {
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
}

interface ReadingListContextType {
  readingList: Book[];
  addToReadingList: (book: Book) => void;
  removeFromReadingList: (title: string) => void;
}

const ReadingListContext = createContext<ReadingListContextType | undefined>(
  undefined
);

export const ReadingListProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [readingList, setReadingList] = useState<Book[]>([]);

  const addToReadingList = (book: Book) => {
    setReadingList((prevList) => [...prevList, book]);
  };

  const removeFromReadingList = (title: string) => {
    setReadingList((prevList) =>
      prevList.filter((book) => book.title !== title)
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
