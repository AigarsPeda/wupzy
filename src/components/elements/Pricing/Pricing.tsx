import { signIn, useSession } from "next-auth/react";
import { type FC } from "react";
import { BsCheckLg } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import GradientButton from "~/components/elements/GradientButton/GradientButton";
import Mailto from "~/components/elements/Mailto/Mailto";
import GridLayout from "~/components/layout/GridLayout/GridLayout";
import useRedirect from "~/hooks/useRedirect";

const OPTIONS = [
  {
    title: "Hobby",
    price: "Free",
    options: ["Unlimited tournaments", "Unlimited king tournaments"],
  },
  {
    title: "Pro",
    price: "3.45€",
    options: [
      "Unlimited tournaments",
      "Unlimited king tournaments",
      "5 share tournament link",
      "5 split players into groups",
    ],
  },
  {
    title: "Business",
    // price: "Talk to us",
    price: "Custom",
    options: [
      "Unlimited tournaments",
      "Unlimited king tournaments",
      "Unlimited share tournament link",
      "Unlimited split players into groups",
      "Custom solutions",
    ],
  },
];

const Pricing: FC = () => {
  const { redirectToPath } = useRedirect();
  const { data: sessionData } = useSession();

  return (
    <div className="mt-6">
      <GridLayout isGap minWith="300">
        {OPTIONS.map((option) => (
          <div
            key={option.title}
            className="relative z-10 mx-auto w-full rounded-xl bg-slate-200"
          >
            <div className="relative mx-auto flex h-full w-full flex-col justify-between rounded-xl border border-white/25 bg-gray-200 bg-white/5 p-6 shadow-[inset_0_0_8px_rgba(255,255,255,0.2)] backdrop-blur-xl will-change-transform">
              <div className="border-b-2 border-white">
                <div className="pb-2 text-center">
                  <p className="font-medium text-gray-500">{option.title}</p>
                </div>

                <div className="pb-5 text-center">
                  <p className="text-3xl font-semibold text-gray-800">
                    {option.price}
                  </p>
                </div>
              </div>

              <div className="h-full pt-5">
                <ul className="space-y-2 text-gray-800">
                  {option.options.map((opt) => (
                    <li key={opt} className="flex w-full items-center">
                      <BsCheckLg className="mr-2 h-5 w-5 text-green-500" />{" "}
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                {option.title === "Business" ? (
                  <Mailto
                    bgColor="bg-slate-200"
                    email="wupzy@wupzy.com"
                    subject="Custom solutions"
                    body="Business. Custom solutions:"
                  >
                    Talk to us
                    <IoIosArrowForward className="ml-2 h-5 w-5 text-pink-500 group-hover:text-white" />
                  </Mailto>
                ) : (
                  <GradientButton
                    type="button"
                    bgColor="bg-slate-200"
                    icon={
                      <IoIosArrowForward className="ml-2 h-5 w-5 text-pink-500 group-hover:text-white" />
                    }
                    handleClick={() => {
                      if (!sessionData) {
                        void signIn();
                        return;
                      }
                      void redirectToPath("/tournaments");
                    }}
                    title={sessionData ? "Your tournaments" : "Try it now"}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default Pricing;
