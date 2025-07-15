import { createCheckoutSession, confirmPayment } from '../services/paymentService.js';

// Create Stripe checkout session
export const handleCheckout = async (req, res) => {
  try {
    const { placeId, amount } = req.body;

    // Use req.user._id from the verified token
    const userId = req.user.id;

    // Call service to create Stripe session
    const checkoutUrl = await createCheckoutSession({ userId, placeId, amount });

    // Respond with the URL
    res.status(200).json({ url: checkoutUrl });
  } catch (error) {
    console.error('Checkout Error:', error);
    res.status(500).json({ error });
    // res.status(500).json({ message: 'Failed to initiate payment.' });
    console.log("Authenticated user:", req.user);
  }
};

// Handle success redirect from Stripe
export const handleSuccess = async (req, res) => {
  try {
    const { userId, placeId } = req.query;

    // Confirm the payment in DB
    await confirmPayment({ userId, placeId });

    res.status(200).json({ message: 'Payment successful.' });
  } catch (error) {
    console.error('Payment Success Error:', error);
    res.status(500).json({ message: 'Failed to confirm payment.' });
  }
};

// Handle cancel redirect
export const handleCancel = (req, res) => {
  res.status(200).json({ message: 'Payment was cancelled.' });
};
