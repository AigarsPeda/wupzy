import CTASection from "components/elements/CTASection/CTASection";
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { api } from "../utils/api";

// const STRIPE_API_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";

// const stripe = new Stripe(STRIPE_API_KEY, {
//   apiVersion: "2022-11-15",
// });

const Home: NextPage = () => {
  const { data } = api.stripe.getProducts.useQuery();

  return (
    <>
      <Head>
        <title>wupzy</title>
        <meta name="description" content="wupzy" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      <main className="px-4 py-4 md:px-20 md:py-12">
        <CTASection />
        {console.log("data", data)}
      </main>
    </>
  );
};

export default Home;
