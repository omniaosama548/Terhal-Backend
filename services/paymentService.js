import stripe from '../utils/stripe.js';
import Payment from '../models/Payment.js';

// Create Stripe Checkout Session
export const createCheckoutSession = async ({ userId, placeId, amount }) => {
  // Create session in Stripe
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Place Booking',
          },
          unit_amount: amount * 100, // Stripe expects amount in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/payment/success`,
    cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
    metadata: {
      userId,
      placeId,
    },
  });

  // Save payment in DB (status is pending)
  await Payment.create({
    userId,
    placeId,
    amount,
    status: 'pending',
  });

  return session.url;
};

// Confirm payment after success
export const confirmPayment = async ({ userId, placeId }) => {
  // Update latest pending payment to 'paid'
  await Payment.findOneAndUpdate(
    { userId, placeId, status: 'pending' },
    { status: 'paid' },
    { new: true }
  );
};
