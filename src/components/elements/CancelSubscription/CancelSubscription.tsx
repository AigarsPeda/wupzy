import type { FC } from "react";
import { useRef } from "react";
import { RoughNotation } from "react-rough-notation";
import useOnScreen from "../../../hooks/useOnScreen";

const CancelSubscription: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useOnScreen(ref);

  return (
    <div>
      <div className="mx-auto max-w-3xl">
        <p className="font-primary text-gray-600" ref={ref}>
          <RoughNotation
            show={isIntersecting}
            padding={1}
            strokeWidth={3}
            type="underline"
            color="#a855f7"
            animationDelay={500}
          >
            Users have full control over their subscription.
          </RoughNotation>{" "}
          If you ever need to unsubscribe, you can easily do so with just a few
          clicks, no questions asked. And if you unsubscribe in the middle of a
          month, you still have access to all of our features for the remainder
          of that month. It&apos;s just one more way we put our users first.
        </p>
      </div>
    </div>
  );
};

export default CancelSubscription;
