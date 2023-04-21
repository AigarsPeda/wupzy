const isSubscriptionEnded = (d: Date | null | undefined) => {
  const today = new Date();

  if (!d) {
    return false;
  }

  return d < today;
};

export default isSubscriptionEnded;
