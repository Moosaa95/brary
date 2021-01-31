const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})


//button are used to interact with forms
//anchor tag is used link things 

module.exports = router