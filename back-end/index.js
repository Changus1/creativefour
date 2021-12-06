const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');
// connect to the database
mongoose.connect('mongodb://localhost:27017/shelter', {
  useNewUrlParser: true
});
// Create a new animal in the shelter
app.post('/api/animals', async (req, res) => {
  const animal = new Animal({
    name: req.body.name,
    gender: req.body.gender,
    species: req.body.species,
    age: req.body.age,
    image: req.body.image,
    favorite: req.body.favorite,
    description: req.body.description,
  });
  try {
    await animal.save();
    res.send(animal);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Create a new Banner
app.post('/api/banners', async (req, res) => {
  const banner = new Banner({
    h1: req.body.h1,
    p1: req.body.p1,
    p2: req.body.p2,
    image: req.body.image,
  });
  try {
    await banner.save();
    res.send(banner);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for Animals in the shelter
const animalSchema = new mongoose.Schema({
    name: String,
    gender: String,
    species: String,
    age: Number,
    image: String,
    favorite: Boolean,
    description: String,
});
  
// Create a model for Animals in the Shelter.
const Animal = mongoose.model('Animal', animalSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
    // Just a safety check
    if (!req.file) {
      return res.sendStatus(400);
    }
    res.send({
      image: "/images/" + req.file.filename
    });
});

// Get all animals
app.get('/api/animals', async (req, res) => {
    try {
      let animals = await Animal.find();
      res.send(animals);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});
  
// Delete an animal
app.delete('/api/animals/:id', async (req, res) => {
    try {
      await Animal.deleteOne({
        _id: req.params.id
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

// Edit an animal
app.put('/api/animals/:id', async (req, res) => {
try {
    let animal = await Animal.findOne({
    _id: req.params.id
    });
    animal.name = req.body.name,
    animal.gender = req.body.gender,
    animal.species = req.body.species,
    animal.age = req.body.age,
    animal.image = req.body.image,
    animal.favorite = req.body.favorite,
    animal.description = req.body.description,

    animal.save();
    res.sendStatus(200);
} catch (error) {
    console.log(error);
    res.sendStatus(500);
}
});

// Grab a random animal for the animal of the day
app.get('/api/animals/random', async (req, res) => {
  try {
    let animal = await Animal.aggregate([{ $sample: { size: 1 } }]);
    res.send(animal);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});  

//***************************************************************************

// Create a scheme for Animals in the shelter
const bannerSchema = new mongoose.Schema({
  h1: String,
  p1: String,
  p2: String,
  image: String,
});

// Create a model for Animals in the Shelter.
const Banner = mongoose.model('Banner', bannerSchema);

// Get all banners
app.get('/api/banners', async (req, res) => {
  try {
    let banners = await Banner.find();
    res.send(banners);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Delete an animal
app.delete('/api/banners/:id', async (req, res) => {
  try {
    await Banner.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Edit an animal
app.put('/api/banners/:id', async (req, res) => {
try {
  let banner = await Banner.findOne({
  _id: req.params.id
  });
  banner.h1 = req.body.h1,
  banner.p1 = req.body.p1,
  banner.p2 = req.body.p2,
  banner.image = req.body.image,

  banner.save();
  res.sendStatus(200);
} catch (error) {
  console.log(error);
  res.sendStatus(500);
}
});

// Grab a random banner
app.get('/api/banners/random', async (req, res) => {
try {
  let banner = await Banner.aggregate([{ $sample: { size: 1 } }]);
  res.send(banner);
} catch (error) {
  console.log(error);
  res.sendStatus(500);
}
});  

app.listen(3000, () => console.log('Server listening on port 3000!'));