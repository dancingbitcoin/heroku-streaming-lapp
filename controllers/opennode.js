const opennode = require('opennode')
require('dotenv').config()

opennode.setCredentials(process.env.OPENNODE_API_KEY)

// Creates an invoice on OpenNode
const createCharge = async ({ amount }) => {
  try {
    if (typeof process.env.CURRENCY !== 'undefined') {
      const charge = await opennode.createCharge({
        description: `${process.env.LAPP_NAME}: Charge ${amount} sats`,
        amount: parseInt(amount),
        currency: process.env.CURRENCY,
        callback_url: typeof process.env.CALLBACK_URL !== 'undefined' ? process.env.CALLBACK_URL : `${process.env.HEROKU_URL}/pay/callback`,
        success_url: typeof process.env.SUCCESS_URL !== 'undefined' ? process.env.SUCCESS_URL : process.env.HEROKU_URL
      })
      return charge
    } else {
      const charge = await opennode.createCharge({
        description: `${process.env.LAPP_NAME}: Charge ${amount} sats`,
        amount: parseInt(amount),
        callback_url: typeof process.env.CALLBACK_URL !== 'undefined' ? process.env.CALLBACK_URL : `${process.env.HEROKU_URL}/pay/callback`,
        success_url: typeof process.env.SUCCESS_URL !== 'undefined' ? process.env.SUCCESS_URL : process.env.HEROKU_URL
      })
      return charge
    }
  } catch (err) {
    console.error(err)
  }
}

// Checks that access to callback is actually from OpenNode
const signatureIsValid = async (charge) => {
  try {
    return (await opennode.signatureIsValid(charge))
  } catch (err) {
    console.error(err)
  }
}

module.exports = { createCharge, signatureIsValid }