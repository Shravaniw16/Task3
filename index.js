const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory book storage
let books = [];
let idCounter = 1;

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("📚 Book API is running");
});

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// POST add a new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      message: "Title and Author are required"
    });
  }

  const newBook = {
    id: idCounter++,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update a book by ID
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  book.title = title || book.title;
  book.author = author || book.author;

  res.json(book);
});

// DELETE remove a book by ID
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  books.splice(index, 1);
  res.json({
    message: "Book deleted successfully"
  });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
