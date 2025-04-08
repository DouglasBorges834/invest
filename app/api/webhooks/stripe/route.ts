// http://localhost:3000/api/webhooks/stripe
// rota para validar os pagamentos e eventos que estão acontecendo no Stripe
//http://localhost:3000/api/webhooks/stripe
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: Request) => {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.error();
  }

  const text = await req.text();
  const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY, {
    apiVersion: "2024-10-28.acacia",
  });

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  switch (event.type) {
    case "invoice.paid":
      const { customer, subscription, subscription_details } =
        event.data.object;
      const clerkUserId = subscription_details?.metadata
        ?.clerk_user_id as string;
      if (!clerkUserId) {
        return NextResponse.error();
      }
      // Atualizar ambiente ou usuário com novo plano o banco de dados aqui
      await clerkClient().users.updateUser(clerkUserId, {
        privateMetadata: {
          // varaivel sensivel
          stripeCustomerId: customer,
          stripeSubscriptionId: subscription,
        }, //nao precisa porem para fim de debugg ou hisotiro vc consegui ter essa informação no clerk
        publicMetadata: {
          subscriptionPlan: "premium", // Colocar produto ou planos se tiver mais de um, enum ou verificar com valueId
        },
      });
      break;

    case "customer.subscription.deleted": {
      // remover plano do user
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id,
      );
      const clerkUserId = subscription.metadata.clerk_user_id;

      if (!clerkUserId) NextResponse.error();

      await clerkClient().users.updateUser(clerkUserId, {
        privateMetadata: {
          // varaivel sensivel
          stripeCustomerId: null,
          stripeSubscriptionId: null,
        },
        publicMetadata: {
          subscriptionPlan: null,
        },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
};
