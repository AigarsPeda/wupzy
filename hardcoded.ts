import MagicIcon from "~/components/icons/MagicIcon";
import RocketIcon from "~/components/icons/RocketIcon";
import TargetIcon from "~/components/icons/TargetIcon";
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

export const COLORS = ["#e14033", "#ffba32", "#0a7cc3", "#9d33da"];

export const HOW_T0_STEPS = [
  {
    title: "Create a tournament",
    icon: MagicIcon,
    iconColor: COLORS[1],
    description: `When creating a tournament, select set count to win, and the number of rounds to play, add participants.
    Also, you can choose type of tournament: regular or king. In king tournament every individual player plays with every 
    other player and in the end there are only one winner. In regular tournament teams are divided into groups 
    and play with each other in the group. The winners of the groups play in the final stage.
    `,
    imageDesktop: "/asset/create_desktop.webp",
    zoomImageDesktop: "/asset/create_desktop_1.jpg",
  },
  {
    title: "Sharable tournament link",
    icon: RocketIcon,
    iconColor: COLORS[2],
    description: `You can create and share special sharable tournament link. This link allows 
      participants or any interested person to see the tournament results and upcoming matches at any time and from any device.`,
    imageDesktop: "/asset/share_tournament_desktop.webp",
    zoomImageDesktop: "/asset/share_tournament_desktop_1.jpg",
  },
  {
    title: "Enter the scores",
    icon: TargetIcon,
    iconColor: COLORS[3],
    description:
      "Play the tournament and enter scores after match. Progress, standings and upcoming matches are updated automatically.",
    imageDesktop: "/asset/play_tournament_desktop.webp",
    zoomImageDesktop: "/asset/play_tournament_desktop_1.jpg",
  },
];
