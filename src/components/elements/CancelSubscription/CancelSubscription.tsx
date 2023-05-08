import useOnScreen from "hooks/useOnScreen";
import type { FC } from "react";
import { useRef } from "react";
import { RoughNotation } from "react-rough-notation";

const CancelSubscription: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useOnScreen(ref, "-100px");

  return (
    <div>
      <div className="mx-auto max-w-3xl">
        <p
          className="font-primary font-medium text-gray-800 md:text-lg"
          ref={ref}
        >
          <RoughNotation
            multiline
            padding={1}
            strokeWidth={3}
            color="#a855f7"
            type="underline"
            animationDelay={600}
            show={isIntersecting}
          >
            Users have full control over their subscription.
          </RoughNotation>{" "}
          If you ever need to unsubscribe, you can easily do so with just a few
          clicks, no questions asked. And if you unsubscribe in the middle of a
          month, you{" "}
          <RoughNotation
            multiline
            padding={1}
            strokeWidth={3}
            color="#a855f7"
            type="underline"
            animationDelay={1200}
            show={isIntersecting}
          >
            still have access
          </RoughNotation>{" "}
          to all of our features for the remainder of that month. It&apos;s just
          one more way we put our users first.
        </p>
      </div>
    </div>
  );
};

export default CancelSubscription;
