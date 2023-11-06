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

export const ONE_TOURNAMENT_COST = 18;

export const STRIPE_ONE_TIME_PURCHASE_PRICE_ID =
  process.env.NODE_ENV === "development"
    ? "price_1O6UXdFTT3aSVLG6UaXB9XuR"
    : "price_1O6UYqFTT3aSVLG6ZcIcnYvx";

export const HOW_T0_STEPS = [
  {
    title: "Create a tournament",
    description: "Create a tournament and add players",
    imageDesktop: "/asset/create_desktop.webp",
    imageMobile: "/asset/create_mobile.webp",
  },
  {
    title: "Share the tournament link",
    description: "Share the tournament link with your friends",
    imageDesktop: "/asset/share_tournament_desktop.webp",
    imageMobile: "/asset/share_tournament_mobile.webp",
  },
  {
    title: "Play the tournament",
    description: "Play the tournament and update the results",
    imageDesktop: "/asset/play_tournament_desktop.webp",
    imageMobile: "/asset/play_tournament_mobile.webp",
  },
];
