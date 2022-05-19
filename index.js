const dotenv = require('dotenv');
const express = require('express');
const peopleRoutes = require('./people/router');

const PORT = process.env.PORT || 3005;

const app = express();

// use json
dotenv.config()

const knex = require("./database");

app.use(express.json());

app.use('/people', peopleRoutes)

// ============================================================
// Really just to show you stuff


// Create Table
app.get('/', async (req, res) => {
  try {
  await knex.schema.dropTableIfExists("cars")

  console.log("Dropped table")
  console.log("Creating new table")

  await knex.schema.createTable("cars", (table) => {
    table.increments("id").primary()
    table.string("make")
    table.string("model")
    table.integer("year")
    table.integer("cylinders")
    table.boolean("vConfig")
  })

  const cars = await knex("cars").insert([
    {
      make: "Toyota",
      model: "Sienna",
      year: 2008,
      cylinders: 6,
      vConfig: true,
    },
    {
      make: "Honda",
      model: "Civic",
      year: 2013,
      cylinders: 4,
      vConfig: false,
    },
    {
      make: "Kia",
      model: "Forte Hatchback",
      year: 2012,
      cylinders: 4,
      vConfig: false
    },
    {
      make: "Hyundai",
      model: "Tucson",
      year: 2020,
      cylinders: 4,
      vConfig: true
    }
  ])


    // Printing out the first make in the table
    const data = await knex.select("*").from("cars");
    let makes = []
  for (let i = 0; i < data.length; i++) {
    makes.push(data[i].make);
  }
  res.send(makes)


  } catch (err) {
    // just log something
    console.log("ERROR")
    console.log(err)
  }

  // // send json
  // res.status(200).json({
  //   message: process.env.TEST,
  // });
});

app.get('/hello', (req, res) => {
  res.status(200).json({
    message: 'Hello Again World!',
  });
});

let count = 0

app.get('/counter', (req, res) => {
  count += 1;
  res.status(200).json({
    count
  });
});


app.post('/login', (req, res) => {

  const { username, password } = req.body;

  if (username === 'admin' && password === 'password') {
    res.status(200).json({
      message: 'Login Successful',
    });
  } else {
    res.status(401).json({
      message: 'Login Failed',
    });
  }
});

// PUT requests are similar
// DELETE requests are for deleting data


// ============================================================
// Real stuff again

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});