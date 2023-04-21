import type { FC } from "react";
import type Stripe from "stripe";

interface DisplayProductsProps {
  products: Stripe.ApiList<Stripe.Price>;
  handleCheckout: (priceId: string) => Promise<void>;
}

const DisplayProducts: FC<DisplayProductsProps> = ({
  products,
  handleCheckout,
}) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      {products?.data.map((product) => {
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
                handleCheckout(product.id).catch((err) => {
                  console.log("Error in handleCheckout: ", err);
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
