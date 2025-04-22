"use client";
import { Button } from "@/app/_components/ui/button";
import React from "react";
import { createStripeCheckout } from "../_actions/create-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export const AcquiredPlanButton = () => {
  const { user } = useUser();
  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan == "premium";
  const handleAcquiredPlan = async () => {
    const { sessionId } = await createStripeCheckout();
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );

    if (!stripe) {
      throw new Error("stripe not found");
    }

    await stripe.redirectToCheckout({
      sessionId: sessionId!,
    });
  };

  if (hasPremiumPlan) {
    return (
      <Button variant={"link"} className="w-full rounded-full">
        <Link
          target="_blank"
          href={`${process.env.NEXT_PUBLIC_STRIPE_COSTUMER_URL}?prefilled_email=${user?.emailAddresses[0]?.emailAddress}`}
        >
          Gerenciar plano
        </Link>
      </Button>
    );
  }

  return (
    <Button className="w-full rounded-full" onClick={handleAcquiredPlan}>
      Adquirir Plano
    </Button>
  );
};
