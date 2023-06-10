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
