import MagicIcon from "~/components/icons/MagicIcon";
import PlayoffIcon from "~/components/icons/PlayoffIcon";
import RocketIcon from "~/components/icons/RocketIcon";
import TargetIcon from "~/components/icons/TargetIcon";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaLink } from "react-icons/fa6";
import { OptionType, type LinkType } from "~/types/utils.types";

export const LINKS: LinkType[] = [
  {
    public: true,
    href: "/pricing",
    label: "Pricing",
    isInDropdown: false,
  },
  {
    public: false,
    href: "/tournaments",
    label: "Tournaments",
    isInDropdown: false,
  },
  {
    public: false,
    href: "/signups",
    label: "Signup links",
    isInDropdown: false,
  },
  {
    public: false,
    href: "/signups/[id]",
    isInDropdown: false,
    // label: "Signup links",
  },
  {
    public: false,
    href: "/new-signup-link",
    label: "New signup link",
    isInDropdown: true,
    icon: FaLink,
  },
  {
    public: false,
    href: "/new-tournament",
    label: "New tournament",
    isInDropdown: true,
    icon: AiOutlineFileAdd,
  },
  {
    public: false,
    href: "/tournaments/[id]",
    // label: "Tournament",
    isInDropdown: false,
  },
];

export const PAGES_WITHOUT_HEADER = ["/share/[slug]", "/signup/[slug]"];

export const ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

export const ONE_TOURNAMENT_COST = 18;

export const STRIPE_ONE_TIME_PURCHASE_PRICE_ID =
  process.env.NODE_ENV === "development"
    ? "price_1O6UXdFTT3aSVLG6UaXB9XuR"
    : "price_1O6UYqFTT3aSVLG6ZcIcnYvx";

export const COLORS = [
  "#e14033",
  "#ffba32",
  "#0a7cc3",
  "#9d33da",
  "#2e7650",
  "#9f6b53",
];

export const HOW_T0_STEPS = [
  {
    title: "Create a tournament",
    icon: MagicIcon,
    iconColor: COLORS[0],
    description: `When creating a tournament, select set count to win, and the number of rounds to play, add participants.
    Also, you can choose type of tournament: regular or king. In king tournament every individual player plays with every 
    other player and in the end there are only one winner. In regular tournament teams are divided into groups 
    and play with each other in the group. The winners of the groups play in the final stage.
    `,
    imageDesktop: "/asset/create_desktop.webp",
    zoomImageDesktop: "/asset/create_desktop_1.jpg",
  },
  {
    title: "Signup link",
    icon: FaLink,
    iconColor: COLORS[1],
    description: `To create a signup link, first add a description and specify the type of tournament. Once created, you can distribute this link through social media platforms or email. This link enables participants to conveniently register for the tournament from any location and on any device. 
                  Share it with potential participants to allow them easy access to the signup process at their convenience.`,
    imageDesktop: "/asset/signup_link_5.webp",
    zoomImageDesktop: "/asset/signup_link_5.webp",
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
  {
    title: "Playoffs bracket",
    icon: PlayoffIcon,
    iconColor: COLORS[4],
    description: `With just few clicks at any time you can create playoffs bracket 
    based on the results in the group. This bracket will automatically be available in sharable tournament link.`,
    imageDesktop: "/asset/playoffs.webp",
    zoomImageDesktop: "/asset/playoffs.webp",
  },
];

export const USER_STATEMENTS = [
  {
    name: "Matthew",
    text: `I have been using this site for a while now. I use it when I play with my friends and it is very useful.
            We don't have to write down the results on paper anymore. I can just enter the results on my phone and see the standings.`,
    image: "/asset/people/matthew.png",
  },
  {
    name: "John",
    text: `I am a beach volleyball coach and I use this site to organize tournaments for local teams. 
            I can easily create a tournament and share it with everyone. They can see the games and results on their phones.`,
    image: "/asset/people/john.png",
  },
  {
    name: "Elena",
    text: `We use this site to organize tournaments at our company. We have a lot of employees and it is very convenient to use this site.`,
    image: "/asset/people/elena.png",
  },
];

export const OPTIONS: OptionType[] = [
  {
    title: "Hobby",
    price: "Free",
    options: ["Unlimited tournaments", "Unlimited king tournaments"],
    info: "Ideal for friend gatherings.",
  },
  {
    title: "Pro",
    price: "0.50€",
    options: [
      "Unlimited tournaments",
      "Unlimited king tournaments",
      "5 signup link",
      "5 share tournament link",
      "5 split players into groups",
    ],
    info: "Great for bigger tournaments, ensuring essential result tracking.",
  },
  {
    title: "Business",
    price: "Custom",
    options: [
      "Unlimited tournaments",
      "Unlimited king tournaments",
      "Unlimited signup link",
      "Unlimited share tournament link",
      "Unlimited split players into groups",
      "Custom solutions",
    ],
    info: "Ideal for companies in need of customized solutions.",
  },
];
