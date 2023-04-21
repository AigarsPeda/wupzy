import DisplayProducts from "components/elements/DisplayProducts/DisplayProducts";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import Spinner from "components/elements/Spinner/Spinner";
import isSubscriptionEnded from "components/elements/SubscriptionEndModal/utils/isSubscriptionEnded";
import { ROUTES_WITHOUT_NAVBAR } from "hardcoded";
import { useRouter } from "next/router";
import type { FC } from "react";
import { api } from "utils/api";

const SubscriptionEndModal: FC = () => {
  const router = useRouter();
  const { data } = api.users.getCurrentUser.useQuery();
  const { mutateAsync } = api.stripe.createCheckoutSession.useMutation();
  const { data: products, isSuccess } = api.stripe.getProducts.useQuery(
    undefined,
    {
      enabled: isSubscriptionEnded(data?.user.expiresAt),
    }
  );

  const checkout = async (priceId: string) => {
    const { id, url } = await mutateAsync({
      priceId,
      stripeCustomerId: data?.user.stripeCustomerId,
    });

    if (id && url) {
      router.push(url).catch((err) => {
        console.log(err);
      });
    }
  };

  if (
    ROUTES_WITHOUT_NAVBAR.includes(router.pathname) ||
    router.pathname === "/"
  )
    return null;

  return (
    <ModalWrap
      isModalVisible={isSuccess}
      modalTitle="Your subscription has ended"
      handleCancelClick={() => {
        return null;
      }}
    >
      {products ? (
        <DisplayProducts
          handleCheckout={checkout}
          products={products.products}
        />
      ) : (
        <Spinner size="small" />
      )}
    </ModalWrap>
  );
};

export default SubscriptionEndModal;
