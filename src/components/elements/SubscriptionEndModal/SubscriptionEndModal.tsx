import DisplayProducts from "components/elements/DisplayProducts/DisplayProducts";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import Spinner from "components/elements/Spinner/Spinner";
import isSubscriptionEnded from "components/elements/SubscriptionEndModal/utils/isSubscriptionEnded";
import { ROUTES_WITHOUT_NAVBAR } from "hardcoded";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { api } from "utils/api";

const SubscriptionEndModal: FC = () => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { mutateAsync } = api.stripe.createCheckoutSession.useMutation();
  const { data: products } = api.stripe.getProducts.useQuery(undefined, {
    enabled: isModalVisible,
  });
  const { data } = api.users.getCurrentUser.useQuery(undefined, {
    refetchInterval(data) {
      if (data && data.user) {
        return isSubscriptionEnded(data.user.expiresAt) ? 1250 : false;
      }

      return false;
    },
  });

  const checkout = async (priceId: string) => {
    const { id, url } = await mutateAsync({
      priceId,
      stripeCustomerId: data?.user.stripeCustomerId || undefined,
    });

    if (id && url) {
      router.push(url).catch((err) => {
        console.log(err);
      });
    }
  };

  useEffect(() => {
    if (data && data.user) {
      // select all buttons and inputs that are not in the modal and disable them

      setIsModalVisible(isSubscriptionEnded(data.user.expiresAt));
      return;
    }

    setIsModalVisible(false);
  }, [data]);

  useEffect(() => {
    if (isModalVisible) {
      const buttons = document.querySelectorAll("button");

      buttons.forEach((button) => {
        if (button.classList.contains("buy-button")) return;

        button.disabled = true;
        button.style.userSelect = "none";
        button.style.touchAction = "none";
        button.style.cursor = "not-allowed";
        button.style.pointerEvents = "none";
      });
      return;
    }
  }, [isModalVisible]);

  if (
    ROUTES_WITHOUT_NAVBAR.includes(router.pathname) ||
    router.pathname === "/"
  )
    return null;

  return (
    <ModalWrap
      isModalVisible={Boolean(products) && isModalVisible}
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
