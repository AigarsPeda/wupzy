import type { FC } from "react";
import type { UserType } from "types/user.types";
import formatDate from "../../../utils/formatDate";
import classNames from "../../../utils/classNames";

interface UserProfileProps {
  user: UserType;
}

const UserProfile: FC<UserProfileProps> = ({ user }) => {
  return (
    <div>
      <div className="flex">
        <p>{user.firstName}</p>
        <p className="ml-2">{user.lastName}</p>
      </div>
      <div className="flex">
        <p>Subscription:</p>
        <p
          className={classNames(
            user.subscriptionStatus === "unpaid" && "text-red-500",
            user.subscriptionStatus === "active" && "text-green-500",
            user.subscriptionStatus === "canceled" && "text-red-500",
            user.subscriptionStatus === "past_due" && "text-red-500",
            user.subscriptionStatus === "trialing" && "text-yellow-500",
            "ml-2"
          )}
        >
          {user.subscriptionStatus}
        </p>
      </div>
      <div className="flex">
        <p>Subscription ends:</p>
        <p className="ml-2">{formatDate(user.expiresAt)}</p>
      </div>
    </div>
  );
};

export default UserProfile;
