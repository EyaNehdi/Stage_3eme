const express=require('express')
const router =express.Router()
const { ajouterOffre,GetOffre,GetOffres,DeleteOffre,UpdateOffre} = require('../controllers/offreController')




//GET all offres
router.get('/', GetOffres)

//GET une offre
router.get('/:id',GetOffre)

//DELETE une offre
router.delete('/:id',DeleteOffre)

//UPDATE une offre
router.patch('/:id',UpdateOffre)

//CREATE une offre
router.post('/',ajouterOffre);



module.exports = router
