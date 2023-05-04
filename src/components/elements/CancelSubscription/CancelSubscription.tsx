import type { FC } from "react";
import Highlighter from "react-highlight-words";

const CancelSubscription: FC = () => {
  return (
    <div>
      <div className="mx-auto max-w-3xl">
        <p className="font-primary text-gray-600">
          <Highlighter
            autoEscape={true}
            highlightClassName="highlightLine px-1 py-0.5"
            searchWords={["Users have full control over their subscription."]}
            textToHighlight="Users have full control over their subscription.           If you ever need to unsubscribe, you can easily do so with just a few
            clicks, no questions asked. And if you unsubscribe in the middle of a
            month, you'll still have access to all of our features for the
            remainder of that month. It's just one more way we put our users
            first."
          />
        </p>
      </div>
    </div>
  );
};

export default CancelSubscription;
