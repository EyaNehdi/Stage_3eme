const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {
 
})
.then(() => console.log('Connexion à MongoDB réussie'))
.catch(err => console.error('Erreur de connexion à MongoDB', err));

module.exports = mongoose;
