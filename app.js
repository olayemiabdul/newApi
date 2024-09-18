// app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path'); 
const bodyParser = require('body-parser');

// Middleware to parse JSON requests

app.use(express.json());
app.use(bodyParser.json()); // to parse application/json
app.use(bodyParser.urlencoded({ extended: true })); 



app.use('/images', express.static(path.join(__dirname, 'public/images')));



let products = [
  {
    id: 1,
    name: 'Product A',
    description: 'Description for Product A',
    price: 29.99,
    imageUrl: '/images/app1.png'
  },
  {
    id: 2,
    name: 'Product B',
    description: 'Description for Product B',
    price: 49.99,
    imageUrl: '/images/app2.png'
  },
  {
    id: 3,
    name: 'Product C',
    description: 'Description for Product C',
    price: 19.99,
    imageUrl: '/images/app3.png'
  }
];

// Shoe data
let shoes = [
  {
    id: 1,
    name: 'Shoe A',
    description: 'Description for Shoe A',
    price: 29.99,
    imageUrl: '/images/nike1.jpg'
  },
  {
    id: 2,
    name: 'Shoe B',
    description: 'Description for Shoe B',
    price: 49.99,
    imageUrl: '/images/nike2.jpg'
  },
  {
    id: 3,
    name: 'Shoe C',
    description: 'Description for Shoe C',
    price: 19.99,
    imageUrl: '/images/nike1.jpg'
  }
];

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Get all shoes
app.get('/shoes', (req, res) => {
  res.json(shoes);
});

// Get product by ID
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
