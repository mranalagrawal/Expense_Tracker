const express = require('express');
const { addTranscation, getAlltranscation, editTranscation,deleteTranscation } = require('../controllers/transcationController');


//router obj

const router = express.Router()

// routes

//add transection
router.post('/add-transcation',addTranscation)

//edit transection
router.post('/edit-transcation',editTranscation)
//Delete transection
router.post('/delete-transcation',deleteTranscation)
// get transcation 
router.post('/get-transcation',getAlltranscation)



module.exports = router
