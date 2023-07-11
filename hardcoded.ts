import { type LinkType } from "~/types/utils.types";

export const LINKS: LinkType[] = [
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
  },
];

export const PAGES_WITHOUT_HEADER = ["/share/[slug]"];

export const ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

export const PRICE_FOR_100_CREDITS = 345;

export const ONE_TOURNAMENT_COST = 18;

export const STRIPE_PRICE_ID =
  process.env.NODE_ENV === "development"
    ? "price_1NP7sDFTT3aSVLG6wBWIJrXN"
    : "price_1NPyuIFTT3aSVLG6lVGK9JMN";

// export const TEST_STRIPE_PRICE_ID = "price_1NP7sDFTT3aSVLG6wBWIJrXN";
