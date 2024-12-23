const fs = require("fs/promises");

const bodyParser = require("body-parser");
const express = require("express");

require('dotenv').config();

const { Client } = require('pg');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database!');
  })
  .catch(err => {
    console.error('Connection error', err.stack);
  });

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//GET ROUTE FOR MEALS
app.get("/meals", async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM meals');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching meals:', err);
    res.status(500).json({ message: 'Failed to fetch meals.' });
  }
});

app.post("/orders", async (req, res) => {
  const { customer, items, totalPrice } = req.body.order;

  if (
    !customer.name ||
    !customer.email ||
    !customer.street ||
    !customer.postalCode ||
    !customer.city ||
    items.length === 0
  ) {
    return res.status(400).json({ message: "Invalid order data." });
  }

  try {
    const orderQuery = `
      INSERT INTO orders (name, email, street, postal_code, city, total_price, items)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;
    `;
    const values = [
      customer.name,
      customer.email,
      customer.street,
      customer.postalCode,
      customer.city,
      totalPrice,
      JSON.stringify(items),
    ];
    const result = await client.query(orderQuery, values);

    res.status(201).json({ message: "Order created!", orderId: result.rows[0].id });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Failed to save order." });
  }
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

app.listen(3000, ()=> {
  console.log("Server is running on port 3000");
});
