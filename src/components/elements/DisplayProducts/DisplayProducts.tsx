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
  const getPeriod = (interval: Stripe.Price.Recurring.Interval) => {
    switch (interval) {
      case "day":
        return "day";
      case "week":
        return "week";
      case "month":
        return "month";
      case "year":
        return "year";
      default:
        return "month";
    }
  };

  const getCurrencies = (currency: Stripe.Price) => {
    switch (currency.currency) {
      case "usd":
        return "$";
      case "eur":
        return "€";
      case "gbp":
        return "£";
      default:
        return "€";
    }
  };

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
      {products?.data.map((product) => {
        const { name } = product.product as Stripe.Product;

        return (
          <div
            key={product.id}
            className="mx-auto w-full max-w-sm rounded-lg border bg-white shadow-lg"
          >
            <div className="w-full bg-gray-50 p-4">
              <p className="text-center font-primary text-xl text-gray-700">
                {name}
              </p>
            </div>
            <div className="px-4 py-5">
              <p className="text-center font-primary text-2xl text-gray-500">
                <span className="text-gray-800">
                  {(product.unit_amount || 0) / 100} {getCurrencies(product)}
                </span>
                <span className="mx-2">/</span>
                {getPeriod(product.recurring?.interval || "month")}
              </p>
            </div>
            <div className="flex w-full items-center justify-center px-4 py-6">
              <button
                className="buy-button rounded-lg bg-gray-900 px-6 py-2 text-white transition-all hover:bg-violet-800 "
                onClick={() => {
                  handleCheckout(product.id).catch((err) => {
                    console.log("Error in handleCheckout: ", err);
                  });
                }}
              >
                Select this
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayProducts;
