import type { FC } from "react";

const CancelSubscription: FC = () => {
  return (
    <div>
      <div className="mx-auto max-w-3xl">
        <p className="font-primary text-gray-600">
          <span className="font-medium text-gray-900">
            Users have full control over their subscription.
          </span>{" "}
          If you ever need to unsubscribe, you can easily do so with just a few
          clicks, no questions asked. And if you unsubscribe in the middle of a
          month, you&apos;ll still have access to all of our features for the
          remainder of that month. It&apos;s just one more way we put our users
          first.
        </p>
      </div>
    </div>
  );
};

export default CancelSubscription;
