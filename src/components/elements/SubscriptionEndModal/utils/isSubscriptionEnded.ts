const isSubscriptionEnded = (d: Date | null | undefined) => {
  const today = new Date();

  if (!d) {
    return false;
  }

  // check if subscription has ended by yesterday
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  return d < yesterday;
};

export default isSubscriptionEnded;
