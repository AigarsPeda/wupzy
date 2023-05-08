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
        return "per day";
      case "week":
        return "per week";
      case "month":
        return "per month";
      case "year":
        return "per year";
      default:
        return "per month";
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
    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 font-primary md:grid-cols-2">
      {products?.data.map((product, i) => {
        const { name } = product.product as Stripe.Product;
        // const oldPrice = Math.floor(((product.unit_amount || 0) / 100) * 1.5);

        return (
          <button
            key={product.id}
            className="z-1 group relative mx-auto w-full max-w-sm rounded-lg border bg-white shadow-lg transition-all "
            onClick={() => {
              handleCheckout(product.id).catch((err) => {
                console.log("Error in handleCheckout: ", err);
              });
            }}
          >
            <div
              style={{
                animationDelay: `${i + 1.5}s`,
              }}
              className="absolute -inset-1 animate-slow-ping rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur transition duration-1000 group-hover:animate-none group-hover:opacity-60 group-hover:duration-200"
            ></div>
            <div className="items-top relative rounded-lg bg-white leading-none ring-1 ring-gray-900/5">
              <div className="w-full rounded-t-lg bg-gray-50 p-4">
                <p className="text-center font-primary text-xl text-gray-700">
                  {name}
                </p>
              </div>
              <div className="py-4">
                {/* <div className="w-content px-2 py-1">
                  <p className="text-2xl text-gray-800">{oldPrice} €</p>
                </div> */}
                <div className="mx-auto px-4 pt-3">
                  <div className="mx-auto flex items-center justify-center text-center font-primary text-gray-500">
                    <p className="text-4xl text-gray-800">
                      {(product.unit_amount || 0) / 100}{" "}
                      {getCurrencies(product)}
                    </p>
                    <p className="ml-2.5 w-10 break-normal text-left text-xs">
                      {getPeriod(product.recurring?.interval || "month")}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-center px-4 pb-4 pt-7">
                  <span className="buy-button rounded-lg bg-gray-900 px-6 py-2 text-base font-medium text-white transition-all group-hover:bg-violet-800 md:text-sm">
                    Select
                  </span>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default DisplayProducts;
