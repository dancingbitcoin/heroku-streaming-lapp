const express = require('express')
const router = express.Router()

const opennodeController = require('../controllers/opennode')
require('dotenv').config()

/* GET checkout page */
router.get('/', async (req, res, next) => {
  try {
    amount = process.env.MIN_PAYMENT
    if (req.body.amount < process.env.MIN_PAYMENT) return res.status(500)
    const charge = await opennodeController.createCharge({ amount })
    return res.redirect(`https://checkout.opennode.com/${charge.id}`)
  } catch (err) {
    console.error(err)
  }
})

/* POST callback when invoice paid */
router.post('/callback', async (req, res, next) => {
  try {
    const charge = req.body
    const isValid = await opennodeController.signatureIsValid(charge)

    if (isValid) {
      console.log('Payment received at OpenNode')
      res.locals.isPaid = true
      console.log(res.locals.isPaid)
      res.redirect('/')
    }
  } catch (err) {
    console.error(err)
  }
})

router.get('/success', async (req, res, next) => {
  console.log('get success')
  app.locals.isPaid = true
  console.log(res.locals.isPaid)
  res.render('index', {
    title: process.env.LAPP_NAME,
    embed: process.env.VIDEO_EMBED,
    currency: typeof process.env.CURRENCY !== 'undefined' ? process.env.CURRENCY : 'sats',
    minPayment: process.env.MIN_PAYMENT
  })
  /*try {
    const charge = req.body
    const isValid = await opennodeController.signatureIsValid(charge)

    if (isValid) {
      console.log('Payment received at OpenNode')
      res.locals.isPaid = true
      console.log(res.locals.isPaid)
      return res.redirect('/')
    }
  } catch (err) {
    console.log('/success')
    console.error(err)
  }*/
})

module.exports = router