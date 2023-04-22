import DisplayProducts from "components/elements/DisplayProducts/DisplayProducts";
import Spinner from "components/elements/Spinner/Spinner";
import { useRouter } from "next/router";
import { api } from "utils/api";

const BuyProducts = () => {
  const router = useRouter();
  const { data } = api.stripe.getProducts.useQuery();
  const { mutateAsync } = api.stripe.createCheckoutSession.useMutation();

  const checkout = async (priceId: string) => {
    const { id, url } = await mutateAsync({ priceId });

    if (id && url) {
      router.push(url).catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <div className="relative mt-7 min-h-[10rem] w-full">
      {!data ? (
        <Spinner size="small" />
      ) : (
        <DisplayProducts products={data.products} handleCheckout={checkout} />
      )}
    </div>
  );
};

export default BuyProducts;
