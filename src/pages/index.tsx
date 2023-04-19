import CTASection from "components/elements/CTASection/CTASection";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import type Stripe from "stripe";
import { api } from "utils/api";

const Home: NextPage = () => {
  const router = useRouter();
  const { data } = api.stripe.getProducts.useQuery();
  const { mutateAsync } = api.stripe.createCheckoutSession.useMutation();

  const checkout = async (priceId: string) => {
    const { id, url } = await mutateAsync({
      priceId,
    });

    if (id && url) {
      router.push(url).catch((err) => {
        console.log(err);
      });
    }
  };

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
        {console.log(data)}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {data &&
            data.products.data.map((product) => {
              const { name } = product.product as Stripe.Product;

              return (
                <div
                  key={product.id}
                  className="rounded-lg bg-white p-4 shadow-lg"
                >
                  <p>{name}</p>
                  <p className="text-gray-500">
                    {(product.unit_amount || 0) / 100} {product.currency}
                  </p>
                  <button
                    className="rounded-lg bg-blue-500 px-4 py-2 text-white"
                    onClick={() => {
                      checkout(product.id).catch((err) => {
                        console.log(err);
                      });
                    }}
                  >
                    Buy
                  </button>
                </div>
              );
            })}
        </div>
      </main>
    </>
  );
};

export default Home;
