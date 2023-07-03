import getStripe from "./getStripe";

type CheckoutArgsType = {
  lineItems: {
    price: string;
    quantity: number;
  }[];
};

export async function checkout({ lineItems }: CheckoutArgsType) {
  const stripe = await getStripe();

  if (!stripe) {
    throw new Error("Could not load stripe");
  }

  await stripe.redirectToCheckout({
    lineItems,
    mode: "payment",
    cancelUrl: window.location.origin,
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
  });
}
