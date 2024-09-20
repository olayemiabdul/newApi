const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors'); 
const bodyParser = require('body-parser');

// Middleware to parse JSON and URL-encoded data
app.use(cors());

app.use(express.json());
app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: true })); // to parse application/x-www-form-urlencoded

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
    imageUrl: 'https://nadstore-1c5d66f32aff.herokuapp.com/images/nike1.jpg' // Full URL
  },
  {
    id: 2,
    name: 'Shoe B',
    description: 'Description for Shoe B',
    price: 49.99,
    quantity: 10,
    imageUrl: 'https://nadstore-1c5d66f32aff.herokuapp.com/images/nike2.jpg' // Full URL
  },
  {
    id: 3,
    name: 'Shoe C',
    description: 'Description for Shoe C',
    price: 19.99,
    quantity: 10,
    imageUrl: 'https://nadstore-1c5d66f32aff.herokuapp.com/images/nike1.jpg' // Full URL
  }
];

// Variable to keep track of the last ID
let lastId = products.length > shoes.length ? products[products.length - 1].id : shoes[shoes.length - 1].id;
const newProductId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
  console.log(req.body); 
});

// Get all shoes
app.get('/shoes', (req, res) => {
  res.json(shoes);
  console.log(req.body); 
});

// Get product by ID
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// Get shoe by ID
app.get('/shoes/:id', (req, res) => {
  const shoe = shoes.find(p => p.id === parseInt(req.params.id));
  if (!shoe) return res.status(404).json({ error: 'Shoe not found' });
  res.json(shoe);
  console.log(shoes)
});

// POST - Add a new product
app.post('/products', (req, res) => {
  const newId = ++newProductId;
  const newProduct = {
    id: newId,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    imageUrl: req.body.imageUrl
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// POST - Add a new shoe
app.post('/shoes', (req, res) => {
  const newId = ++newProductId;
  const newShoe = {
    id: newId,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    imageUrl: req.body.imageUrl
  };
  shoes.push(newShoe);
  res.status(201).json(newShoe);
});

// PATCH - Partially update a product
app.patch('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });

  if (req.body.name) product.name = req.body.name;
  if (req.body.description) product.description = req.body.description;
  if (req.body.price) product.price = req.body.price;
  if (req.body.quantity) product.quantity = req.body.quantity;
  if (req.body.imageUrl) product.imageUrl = req.body.imageUrl;

  res.json(product);
});

// PATCH - Partially update a shoe
app.patch('/shoes/:id', (req, res) => {
  const shoe = shoes.find(p => p.id === parseInt(req.params.id));
  if (!shoe) return res.status(404).json({ message: 'Shoe not found' });

  if (req.body.name) shoe.name = req.body.name;
  if (req.body.description) shoe.description = req.body.description;
  if (req.body.price) shoe.price = req.body.price;
  if (req.body.quantity) shoe.quantity = req.body.quantity;
  if (req.body.imageUrl) shoe.imageUrl = req.body.imageUrl;

  res.json(shoe);
});

// PUT - Replace a product
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  const replacementProduct = {
    id: id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    imageUrl: req.body.imageUrl
  };

  products[index] = replacementProduct;
  res.json(replacementProduct);
});

// PUT - Replace a shoe
app.put('/shoes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = shoes.findIndex(p => p.id === id);

  if (index === -1) return res.status(404).json({ message: 'Shoe not found' });

  const replacementShoe = {
    id: id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    imageUrl: req.body.imageUrl
  };

  shoes[index] = replacementShoe;
  res.json(replacementShoe);
});

// DELETE a product by ID
app.delete('/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  products.splice(index, 1);
  res.json({ message: 'Product deleted' });
});

// DELETE a shoe by ID
app.delete('/shoes/:id', (req, res) => {
  const index = shoes.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Shoe not found' });

  shoes.splice(index, 1);
  res.json({ message: 'Shoe deleted' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
