const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const multer = require('multer'); // Import multer

// Middleware to parse JSON and URL-encoded data
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/'); // Directory where the images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename format
  }
});

const upload = multer({ storage: storage });

// Serve static files
app.use('/images', express.static(path.join(__dirname, 'public/images')));

let products = [
  {
    id: 1,
    name: 'Product A',
    description: 'Description for Product A',
    price: 29.99,
    quantity: 10,
    imageUrl: 'https://nadstore-1c5d66f32aff.herokuapp.com/images/app1.png'
  },
  {
    id: 2,
    name: 'Product B',
    description: 'Description for Product B',
    price: 49.99,
    quantity: 9,
    imageUrl: 'https://nadstore-1c5d66f32aff.herokuapp.com/images/app2.png'
  },
  {
    id: 3,
    name: 'Product C',
    description: 'Description for Product C',
    price: 19.99,
    quantity: 10,
    imageUrl: 'https://nadstore-1c5d66f32aff.herokuapp.com/images/app3.png'
  }
];

// Shoe data
let shoes = [
  {
    id: 1,
    name: 'Shoe A',
    description: 'Description for Shoe A',
    price: 29.99,
    quantity: 10,
    imageUrl: 'https://nadstore-1c5d66f32aff.herokuapp.com/images/nike1.jpg'
  },
  {
    id: 2,
    name: 'Shoe B',
    description: 'Description for Shoe B',
    price: 49.99,
    quantity: 10,
    imageUrl: 'https://nadstore-1c5d66f32aff.herokuapp.com/images/nike2.jpg'
  },
  {
    id: 3,
    name: 'Shoe C',
    description: 'Description for Shoe C',
    price: 19.99,
    quantity: 10,
    imageUrl: 'https://nadstore-1c5d66f32aff.herokuapp.com/images/nike1.jpg'
  }
];

// Variable to keep track of the last ID
let lastId = products.length > shoes.length ? products[products.length - 1].id : shoes[shoes.length - 1].id;
let newProductId = 3;

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Get all shoes
app.get('/shoes', (req, res) => {
  res.json(shoes);
});

// POST - Add a new product with image upload
app.post('/products', upload.single('image'), (req, res) => {
  const newId = ++newProductId;
  const newProduct = {
    id: newId,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    imageUrl: req.file ? `/images/${req.file.filename}` : req.body.imageUrl
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// POST - Add a new shoe with image upload
app.post('/shoes', upload.single('image'), (req, res) => {
  const newId = ++newProductId;
  const newShoe = {
    id: newId,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    imageUrl: req.file ? `/images/${req.file.filename}` : req.body.imageUrl
  };
  shoes.push(newShoe);
  res.status(201).json(newShoe);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
