import { signIn, useSession } from "next-auth/react";
import { type FC } from "react";
import { BsCheckLg } from "react-icons/bs";
import Mailto from "~/components/elements/Mailto/Mailto";
import PrimaryButton from "~/components/elements/PrimaryButton/PrimaryButton";
import GridLayout from "~/components/layout/GridLayout/GridLayout";
import useRedirect from "~/hooks/useRedirect";
import classNames from "~/utils/classNames";

type OptionType = {
  title: string;
  price: string;
  info: string;
  options: string[];
};

const OPTIONS = [
  {
    title: "Hobby",
    price: "Free",
    options: ["Unlimited tournaments", "Unlimited king tournaments"],
    info: "Ideal for friend gatherings.",
  },
  {
    title: "Pro",
    price: "0.50€",
    options: [
      "Unlimited tournaments",
      "Unlimited king tournaments",
      "5 share tournament link",
      "5 split players into groups",
    ],
    info: "Great for bigger tournaments, ensuring essential result tracking.",
  },
  {
    title: "Business",
    price: "Custom",
    options: [
      "Unlimited tournaments",
      "Unlimited king tournaments",
      "Unlimited share tournament link",
      "Unlimited split players into groups",
      "Custom solutions",
    ],
    info: "Ideal for companies in need of customized solutions.",
  },
];

const Pricing: FC = () => {
  const { redirectToPath } = useRedirect();
  const { data: sessionData } = useSession();

  const isPro = (opt: OptionType) => {
    return opt.title === "Pro";
  };

  return (
    <GridLayout isGap minWith="275">
      {OPTIONS.map((option) => (
        <div
          key={option.title}
          className={classNames(
            isPro(option)
              ? "scale-100 border-2 border-gray-800"
              : "scale-100 md:scale-95",
            "flex w-full flex-col justify-between rounded-3xl bg-white p-8 shadow-lg ring-1 ring-gray-200 xl:p-10"
          )}
        >
          <div className="flex h-52 flex-col md:justify-between">
            <div>
              <p className="text-sm text-gray-700 md:pt-10">{option.info}</p>
            </div>
            <div className="flex items-end pt-10">
              <p className="text-3xl font-semibold text-gray-800">
                {option.price}
                {isPro(option) && (
                  <span className="pl-2 text-sm font-normal text-gray-700">
                    / tournament
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="my-5 w-full">
            {option.title === "Business" ? (
              <div className="flex w-full justify-start">
                <Mailto
                  email="wupzy@wupzy.com"
                  subject="Custom solutions"
                  body="Business. Custom solutions:"
                >
                  Talk to us
                </Mailto>
              </div>
            ) : (
              <PrimaryButton
                isFullWidth
                handleClick={() => {
                  if (!sessionData) {
                    void signIn();
                    return;
                  }
                  void redirectToPath("/tournaments");
                }}
                isSelected={isPro(option)}
              >
                Get started
              </PrimaryButton>
            )}
          </div>

          <div className="h-full pt-5">
            <ul className="space-y-4">
              {option.options.map((opt) => (
                <li key={opt} className="flex w-full items-center text-sm">
                  <BsCheckLg className="mr-2 h-5 w-5 text-green-500" />
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </GridLayout>
  );
};

export default Pricing;
