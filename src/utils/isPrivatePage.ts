import { LINKS } from "hardcoded";

const isPrivatePage = (pathname: string) => {
  for (const link of LINKS) {
    if (link.href === pathname) {
      return true;
    }
  }
};

export default isPrivatePage;
