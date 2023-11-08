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

    description: `When creating a tournament, select set count to win, and the number of rounds to play, add participants.
    Also, you can choose type of tournament: regular or king. In king tournament every individual player plays with every 
    other player and in the end there are only one winner. In regular tournament teams are divided into groups 
    and play with each other in the group. The winners of the groups play in the final stage.
    `,
    // additionalDescription: `When creating a tournament, you can also choose type of tournament: regular or king. In king tournament
    //   every individual player plays with every other player and in the end there are only one winner. In regular tournament players are divided
    //   into groups and play with each other in the group. The winners of the groups play in the final stage.`,
    imageDesktop: "/asset/create_desktop.webp",
    zoomImageDesktop: "/asset/create_desktop_1.jpg",
  },
  {
    title: "Sharable tournament link",
    // description:
    //   "Share tournament link with participants or your friends. Link allows to see the tournament results and upcoming matches.",
    description: `You can create and share special sharable tournament link. This link allows 
      participants or any interested person to see the tournament results and upcoming matches at any time and from any device.`,
    // additionalDescription: `You can create and share special sharable tournament link. This link allows
    //   participants or any interested person to see the tournament results and upcoming matches.`,
    imageDesktop: "/asset/share_tournament_desktop.webp",
    zoomImageDesktop: "/asset/share_tournament_desktop_1.jpg",
  },
  {
    title: "Enter the scores",
    description:
      "Play the tournament and enter the scores after match. Progress, standings and upcoming matches are updated automatically.",
    // additionalDescription: `Enter the scores and see the tournament progress and standings in table and bracket views.
    // Progress, standings and upcoming matches are updated automatically.`,

    imageDesktop: "/asset/play_tournament_desktop.webp",
    zoomImageDesktop: "/asset/play_tournament_desktop_1.jpg",
  },
];
