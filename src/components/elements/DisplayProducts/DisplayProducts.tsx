import { useRouter } from "next/router";
import type { FC } from "react";
import type Stripe from "stripe";
import { api } from "utils/api";

const DisplayProducts: FC = () => {
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
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      {data &&
        data.products.data.map((product) => {
          const { name } = product.product as Stripe.Product;

          return (
            <div
              key={product.id}
              className="w-full rounded-lg bg-white p-4 shadow-lg"
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
  );
};

export default DisplayProducts;
