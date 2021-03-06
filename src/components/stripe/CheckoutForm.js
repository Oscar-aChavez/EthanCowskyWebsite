import React, { useState } from 'react';
import axios from 'axios';

import { api } from '../../api';


import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import './CardField.css';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {color: '#fce883'},
      '::placeholder': {color: '#87bbfd'},
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

const CheckoutForm = ({ price, onSucessfullCheckout }) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    const billingDetails = {
        name: event.target.name.value,
        email: event.target.email.value,
    }

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    setProcessingTo(true);

    const { data: clientSecret } = await axios.post(`${api}/payment/test`, {
      // amount is in lowest denomination, $1 = 100 (cents)
      amount: price * 100
    });

    // Get a reference to a mounted CardElement.
    const cardElement = elements.getElement(CardElement);

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: billingDetails
    });

    const confirmedCardPayment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodReq.paymentMethod.id,
    });

    console.log(confirmedCardPayment);

    onSucessfullCheckout();
  };

  return (
    <form className="FormGroup" onSubmit={handleSubmit}>
      <div className="FormRow">
        <label for="name" className="FormRowLabel">Name</label>
        <input type="text" id="name" placeholder="Bilbo Baggins" className="formRowInput"></input>
      </div>
      <div className="FormRow">
        <label for="email" className="FormRowLabel">Email</label>
        <input type="text" id="email" placeholder="ring_carrier@fellowship.com" className="formRowInput"></input>
      </div>

      <div className="FormRow">
        <CardElement options={CARD_OPTIONS} />
      </div>

      <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? "Processing..." : `Pay $${price}`}
      </button>
      
    </form>
  );
};

export default CheckoutForm;