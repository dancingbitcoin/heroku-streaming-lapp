const express = require('express')
const router = express.Router()

require('dotenv').config()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: process.env.LAPP_NAME,
    embed: process.env.VIDEO_EMBED,
    currency: typeof process.env.CURRENCY !== 'undefined' ? process.env.CURRENCY : 'sats',
    minPayment: process.env.MIN_PAYMENT
  })
})

module.exports = router
