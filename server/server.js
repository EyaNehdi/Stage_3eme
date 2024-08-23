const express = require('express');
const mongoose = require('./db/connection'); // Assurez-vous que le chemin est correct
const Offre = require('./models/offreModel'); // Assurez-vous que le chemin est correct

require ('dotenv').config()

const cors = require('cors');


const OffreRoutes = require('./routes/Offres')
const app = express();

app.use(cors());


//Middleware
app.use(express.json());


app.use('/offres',OffreRoutes); 

//Listen requests
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:`,process.env.PORT);


});
