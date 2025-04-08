"use server";
import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

//Product id caso queira mais planos
export const createStripeCheckout = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY, {
    apiVersion: "2024-10-28.acacia",
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    success_url: "http://localhost:3000/", //url quando for sucesso
    cancel_url: "http://localhost:3000/transactions",
    subscription_data: {
      metadata: {
        clerk_user_id: userId,
      },
    },
    line_items: [
      {
        price: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID,
        quantity: 1,
      },
    ],
  });

  return { sessionId: session.id };
};
