const express=require('express')
const {handleGenerateShortURL,handleGetURL,handleGetAnalytics}=require('../controllers/url')

const router=express.Router()

router.post('/',handleGenerateShortURL)
router.get('/:shortId',handleGetURL)
router.get('/analytics/:shortId',handleGetAnalytics)
module.exports=router