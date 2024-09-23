const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const fs = require('fs'); 

// Middleware to parse JSON and URL-encoded data
app.use(cors()); 
app.use(express.json());
app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: true })); 

const dataPath = path.join(__dirname, 'data.json');
const imagePath = path.join(__dirname, 'public/images');

const multer = require('multer');
const upload = multer({ dest: imagePath });

// Serve images statically
app.use('/images', express.static(imagePath));

//  initialize data
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify({ products: [], shoes: [] }), 'utf-8');
}

let products = [];
let shoes = [];

// Load data from data.json
const loadData = () => {
  try {
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(rawData);
    products = data.products || [];
    shoes = data.shoes || [];
  } catch (error) {
    console.error('Error loading data:', error);
  }
};

// Save data to data.json
const saveData = () => {
  fs.writeFileSync(dataPath, JSON.stringify({ products, shoes }, null, 2), 'utf-8');
};


loadData();

// Variable to keep track of the last ID
let lastId = products.length > shoes.length ? products[products.length - 1].id : shoes[shoes.length - 1].id;

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

// Get shoe by ID
app.get('/shoes/:id', (req, res) => {
  const shoe = shoes.find(p => p.id === parseInt(req.params.id));
  if (!shoe) return res.status(404).json({ error: 'Shoe not found' });
  res.json(shoe);
  console.log(shoes);
});

// POST - Add a new product
app.post('/products', upload.single('image'), (req, res) => {
  const { name, description, price, quantity } = req.body;
  const imageUrl = req.file ? `/images/${req.file.filename}` : req.body.imageUrl;

  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name,
    description,
    price: parseFloat(price),
    quantity: parseInt(quantity),
    imageUrl,
  };

  products.push(newProduct);
  saveData();
  res.status(201).json(newProduct);
  console.log('Request to create product received:', req.body);
});

// POST - Add a new shoe
app.post('/shoes', upload.single('image'), (req, res) => {
  const { name, description, price, quantity } = req.body;
  const imageUrl = req.file ? `/images/${req.file.filename}` : req.body.imageUrl;

  const newShoe = {
    id: shoes.length ? shoes[shoes.length - 1].id + 1 : 1,
    name,
    description,
    price: parseFloat(price),
    quantity: parseInt(quantity),
    imageUrl,
  };

  shoes.push(newShoe);
  saveData();
  res.status(201).json(newShoe);
  console.log('Request to create shoe received:', req.body);
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

  saveData();
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

  saveData();
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
    imageUrl: req.body.imageUrl,
  };

  products[index] = replacementProduct;
  saveData();
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
    imageUrl: req.body.imageUrl,
  };

  shoes[index] = replacementShoe;
  saveData();
  res.json(replacementShoe);
});

// DELETE a product by ID
app.delete('/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  products.splice(index, 1);
  saveData();
  res.json({ message: 'Product deleted' });
});

// DELETE a shoe by ID
app.delete('/shoes/:id', (req, res) => {
  const index = shoes.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Shoe not found' });

  shoes.splice(index, 1);
  saveData();
  res.json({ message: 'Shoe deleted' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
