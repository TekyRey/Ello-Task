 ![svgviewer-output](https://github.com/ElloTechnology/backend_takehome/assets/3518127/561bc8d4-bffc-4360-b9ea-61e876bcec93)

# Ello Book Assignment UI

## Overview

This project is part of the Ello Engineering Challenge. It features a teacher-facing UI for assigning books to students. The application allows teachers to search for books, add them to a reading list, and manage this list with options to add or remove books.

## Technologies Used

- **TypeScript**: Ensures type safety and improves the development experience.
- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A popular React UI framework for implementing responsive and aesthetically pleasing components.
- **GraphQL**: Used to query the backend server for book data.

## Features

1. **Search Bar**: Allows users to search for books by title and author.
2. **Book List**: Displays search results including book title, author, and a button to add the book to the reading list.
3. **Reading List**: Displays all the books that have been added by the teacher, with options to remove books from the list.
4. **Responsive Design**: Adjusts the layout for mobile, tablet, and desktop views.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/TekyRey/Ello-Task
    cd Ello-Task
    ```

2. **Backend Setup**:
    - Navigate to the `src/backend` directory and install dependencies:
      ```bash
      cd src/backend
      npm install
      ```
    - Start the GraphQL server:
      ```bash
      npm start
      ```
    - The server will start at `http://localhost:4000/`.

3. **Frontend Setup**:
    - Navigate to the `src/frontend` directory and install dependencies:
      ```bash
      cd ../frontend
      npm install
      ```
    - Start the React application:
      ```bash
      npm start
      ```
    - The application will be available at `http://localhost:3000/`.

## Project Structure

- `src/backend`: Contains the backend server code and GraphQL schema.
- `src/frontend`: Contains the React frontend code.
  - `components`: React components used in the application.
  - `context`: Reading List context code.
  - `assets`: Static assets such as images.
  - `services`: GraphQL queries and other service-related code.
  
  

## Usage

1. **Search for Books**: Use the search bar at the top to find books by title.
2. **Add Books to Reading List**: Click the "Add to Reading List" button next to a book in the search results to add it to your reading list.
3. **View and Manage Reading List**: The reading list displays all added books. You can remove books from the list using the "Delete" button.
4. **Responsive Design**: On mobile and tablet devices, the reading list can be viewed in a modal by clicking the "View Reading List" button.

## Project Demonstration View

### Desktop View
![Desktop View](/frontend/src/assets/demo/web1.png)
![Desktop View](/frontend/src/assets/demo/web2.png)
![Desktop View](/frontend/src/assets/demo/web3.png)


### Tablet View
![Tablet View](/frontend/src/assets/demo/ipad1.png)
![Tablet View](/frontend/src/assets/demo/ipad2.png)


### Mobile View
![Mobile View](/frontend/src/assets/demo/mobile1.png)
![Mobile View](/frontend/src/assets/demo/mobile2.png)


## Contact

For any inquiries or further information, please contact [mwakabayah@gmailcom](mailto:mwakabayah@gmail.com).

Thank you for reviewing my solution for the Ello Engineering Challenge. I look forward to the opportunity to discuss it further.

## Acknowledgements
Special Thanks to the Ello Team for inspiration

Best regards,
Rehema Mwaka Baya
