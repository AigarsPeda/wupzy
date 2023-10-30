import { type LinkType } from "~/types/utils.types";

export const LINKS: LinkType[] = [
  {
    public: true,
    href: "/pricing",
    label: "Pricing",
  },
  {
    public: false,
    href: "/tournaments",
    label: "Tournaments",
  },
  {
    public: false,
    href: "/new-tournament",
    label: "New Tournament",
  },
  {
    public: false,
    href: "/tournaments/[id]",
    // label: "Tournament",
  },
];

export const PAGES_WITHOUT_HEADER = ["/share/[slug]"];

export const ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

// export const PRICE_FOR_100_CREDITS = 250;

export const ONE_TOURNAMENT_COST = 18;

export const STRIPE_ONE_TIME_PURCHASE_PRICE_ID =
  process.env.NODE_ENV === "development"
    ? "price_1O6UXdFTT3aSVLG6UaXB9XuR"
    : "price_1O6UYqFTT3aSVLG6ZcIcnYvx";

// export const TEST_STRIPE_PRICE_ID = "price_1NP7sDFTT3aSVLG6wBWIJrXN";
