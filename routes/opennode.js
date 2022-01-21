const express = require('express')
const router = express.Router()

const opennodeController = require('../controllers/opennode')

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
    console.log('req.body')
    console.log(req.body)
    const isValid = await opennodeController.signatureIsValid(charge)

    if (isValid) {
      console.log('Payment received at OpenNode')
      req.session.isPaid = true
      console.log(req.session.isPaid)
    }
  } catch (err) {
    console.log('error in callback')
    console.error(err)
  }
})

router.get('/callback', async (req, res, next) => {
  console.log('get success')
  /*req.session.isPaid = true
  console.log(res.locals.isPaid)*/
  res.redirect('/')
  /*try {
    const charge = req.body
    console.log('req.body')
    console.log(charge)
    const isValid = await opennodeController.signatureIsValid(charge)

    if (isValid) {
      console.log('Payment received at OpenNode')
      req.session.isPaid = true
      return res.redirect('/')
    }
  } catch (err) {
    console.log('/success')
    console.error(err)
  }*/
})

module.exports = router