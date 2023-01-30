const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51LKCh8HBvb3MzaZzM1Lfu4hxjb64Fd85TFatKgW9LHfkBvDswOOE562XcU0kHYgLWzBx2V1EgX4A3iuuxJAVuPho0024KYgc2Z')

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:4242/success',
    cancel_url: 'http://localhost:4242/cancel',
  });

  res.send({url: session.url});
});

router.post('/create-payment-intent', async (req, res) => {
    const {paymentMethodType, currency,paymentMethodOptions, amount} = req.body;
  
    // Each payment method type has support for different currencies. In order to
    // support many payment method types and several currencies, this server
    // endpoint accepts both the payment method type and the currency as
    // parameters.
    //
    // Some example payment method types include `card`, `ideal`, and `alipay`.
    const params = {
      payment_method_types: [paymentMethodType],
      amount: amount,
      currency: 'usd',
    }
  
    // If this is for an ACSS payment, we add payment_method_options to create
    // the Mandate.
    if(paymentMethodType === 'acss_debit') {
      params.payment_method_options = {
        acss_debit: {
          mandate_options: {
            payment_schedule: 'sporadic',
            transaction_type: 'personal',
          },
        },
      }
    } else if (paymentMethodType === 'konbini') {
      /**
       * Default value of the payment_method_options
       */
      params.payment_method_options = {
        konbini: {
          product_description: 'Tシャツ',
          expires_after_days: 3,
        },
      }
    } else if (paymentMethodType === 'customer_balance') {
      params.payment_method_data = {
        type: 'customer_balance',
      }
      params.confirm = true
      params.customer = req.body?.customerId || await stripe.customers.create().then(data => data.id)
    }
  
    /**
     * If API given this data, we can overwride it
     */
    if (paymentMethodOptions) {
      params.payment_method_options = paymentMethodOptions
    }
  
    // Create a PaymentIntent with the amount, currency, and a payment method type.
    //
    // See the documentation [0] for the full list of supported parameters.
    //
    // [0] https://stripe.com/docs/api/payment_intents/create
    try {
      const paymentIntent = await stripe.paymentIntents.create(params);
      console.log('vvv', paymentIntent?.charges?.data[0]?.receipt_url)
      // Send publishable key and PaymentIntent details to client
      res.send({
        clientSecret: paymentIntent.client_secret,
        nextAction: paymentIntent.next_action,
        receipt_url: paymentIntent?.charges?.data[0]?.receipt_url
      });

    
    } catch (e) {
        console.log('e', e)
      return res.status(400).send({
        error: {
          message: e.message,
        },
      });
    }
  });
  

module.exports = router;