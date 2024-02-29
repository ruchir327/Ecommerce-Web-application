import Product from "../models/product";
import User from "../models/user";
import Cart from "../models/cart";
import Coupon from "../models/coupon";
const stripe = require("stripe")(process.env.STRIPE_SECRET);

export const createPaymentIntent = async (req, res) => {
  console.log(req.body);
  const { couponApplied } = req.body;

  // later apply coupon
  // later calculate price

  // 1 find user
  const user = await User.findOne({ email: req.user.email }).exec();
  // 2 get user cart total
  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderedBy: user._id,
  }).exec();
  console.log("CART TOTAL", cartTotal, "AFTER DIS%", totalAfterDiscount);

  let finalAmount = 0;

  if (couponApplied && totalAfterDiscount) {
    finalAmount = totalAfterDiscount * 100;
  } else {
    finalAmount = cartTotal * 100;
  }

  // create payment intent with order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: finalAmount,
  });
};


export const handlePaidEnrollment = async (req, res) => {
  try {
    // Get the user from the database
    const user = await User.findOne({ email: req.user.email }).exec();
    
    // Retrieve the Stripe session ID from the user
    const stripeSessionId = user.stripeSessionId;

    // If there's no Stripe session ID, return an error
    if (!stripeSessionId) {
      return res.status(400).json({ error: "No Stripe session found" });
    }

    // Retrieve the session details from Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      // purchase details
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.name,
            },
            unit_amount: Math.round(course.price.toFixed(2) * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment", // specify mode as "payment"
      // charge buyer and transfer remaining balance to seller (after fee)
      payment_intent_data: {
        application_fee_amount: Math.round(fee.toFixed(2) * 100),
        transfer_data: {
          destination: course.instructor.stripe_account_id,
        },
      },
      // redirect url after successful payment
      success_url: `${process.env.STRIPE_SUCCESS_URL}/${course._id}`,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });
    console.log("SESSION ID => ", session);

    await User.findByIdAndUpdate(req.user._id, {
      stripeSession: session,
    }).exec();
    res.send(session.id);
  } catch (err) {
    console.log("PAID ENROLLMENT ERR", err);
    return res.status(400).send("Enrollment create failed");
  }
    
};

export const stripeSuccess = async (req, res) => {
  try {
    
    // get user from db to get stripe session id
    const user = await User.findById(req.user._id).exec();
    // if no stripe session return
    if (!user.stripeSession.id) return res.sendStatus(400);
    // retrieve stripe session
    const session = await stripe.checkout.sessions.retrieve(
      user.stripeSession.id
    );
    console.log("STRIPE SUCCESS", session);
    // if session payment status is paid, push course to user's course []
  
    await Cart.findOneAndUpdate({ orderedBy: user._id }, { $set: { products: [] } });
    res.json({ success: true });
  } catch (err) {
    console.log("STRIPE SUCCESS ERR", err);
    res.json({ success: false });
  }
};


// // Check if the payment was successful
// if (session.payment_status === "paid") {
//   // If payment was successful, update the user's cart and perform any other necessary actions
//   // For example, you can clear the user's cart
//   await Cart.findOneAndUpdate({ orderedBy: user._id }, { $set: { products: [] } });

//   // You can also perform other actions here, such as updating user's purchase history, sending confirmation emails, etc.

//   // Send a success response
//   return res.json({ success: true });
// } else {
//   // If payment was not successful, handle accordingly
//   return res.status(400).json({ error: "Payment was not successful" });
// }
// } catch (error) {
// console.error("Error processing Stripe callback:", error);
// return res.status(500).json({ error: "Failed to process Stripe callback" });
// }