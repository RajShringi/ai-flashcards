import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      setup_future_usage: "off_session",
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log("internal error", error);
    return NextResponse.json(
      {
        error: `internal server error: ${error}`,
      },
      { status: 500 }
    );
  }
}
