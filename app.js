// app.js
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
    quantity:10,
    imageUrl: 'https://nadstore-1c5d66f32aff.herokuapp.com/images/app1.png'
  },
  {
    id: 2,
    name: 'Product B',
    description: 'Description for Product B',
    price: 49.99,
    quantity:9,
    imageUrl: 'https://nadstore-1c5d66f32aff.herokuapp.com/images/app2.png'
  },
  {
    id: 3,
    name: 'Product C',
    description: 'Description for Product C',
    price: 19.99,
    quantity:10,
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
    quantity:10,
    imageUrl: 'https://nadstore-1c5d66f32aff.herokuapp.com/images/nike1.jpg' // Full URL
  },
  {
    id: 2,
    name: 'Shoe B',
    description: 'Description for Shoe B',
    price: 49.99,
    quantity:10,
    imageUrl: 'https://nadstore-1c5d66f32aff.herokuapp.com/images/nike2.jpg' // Full URL
  },
  {
    id: 3,
    name: 'Shoe C',
    description: 'Description for Shoe C',
    price: 19.99,
    quantity:10,
    imageUrl: 'https://nadstore-1c5d66f32aff.herokuapp.com/images/nike1.jpg' // Full URL
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
app.get('/shoes/:id', (req, res) => {
  const product = shoes.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});
app.post("/products", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,

    title: req.body.id,
    content: req.body.name,
    author: req.body.price,
    quantity:req.body.quantity,
    imageUrl: req.body.imageUrl,
    date: new Date(),
  };
  lastId = newId;
  products.push(post);
  res.status(201).json(post);
});

app.post("/shoes", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.id,
    content: req.body.name,
    description:req.body.description,
    author: req.body.price,
    quantity:req.body.quantity,
    imageUrl: req.body.imageUrl,
    date: new Date(),
  };
  lastId = newId;
  shoes.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/products/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.id) post.id = req.body.id;
  if (req.body.name) post.name = req.body.name;
  if (req.body.description) post.description = req.body.description;
  if (req.body.price) post.price = req.body.price;
  if (req.body.quantity)post.quantity=req.body.quantity;
  if (req.body.imageUrl) post.imageUrl = req.body.imageUrl;
  

  res.json(post);
});

app.patch("/shoes/:id", (req, res) => {
  const post = shoes.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.id) post.id = req.body.id;
  if (req.body.name) post.name = req.body.name;
  if (req.body.description) post.description = req.body.description;
  if (req.body.price) post.price = req.body.price;
  if (req.body.quantity)post.quantity=req.body.quantity;
  if (req.body.imageUrl) post.imageUrl = req.body.imageUrl;
  

  res.json(post);
});
//Put a product
app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const replacementProduct = {
    id: id,
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    quantity:req.body.quantity,
    imageUrl:req.body.imageUrl,

    
  };

  const searchIndex = jokes.findIndex((joke) => joke.id === id);

  jokes[searchIndex] = replacementProduct;
   console.log(products);
  res.json(replacementJoke);
});

app.put("/shoes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const replacementShoe = {
    id: id,
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    quantity:req.body.quantity,
    imageUrl:req.body.imageUrl,

    
  };

  const searchIndex = jokes.findIndex((joke) => joke.id === id);

  jokes[searchIndex] = replacementShoe;
   console.log(products);
  res.json(replacementJoke);
});

// DELETE a specific post by providing the post id
app.delete("/products/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  products.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.delete("/shoes/:id", (req, res) => {
  const index = shoes.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  shoes.splice(index, 1);
  res.json({ message: "Post deleted" });
});



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
