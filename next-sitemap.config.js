const siteUrl = "https://www.wupzy.com";
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: [
    "/404",
    "/tournaments",
    "/tournaments/[id]",
    "/new-tournament",
    "/new-signup-link",
    "/share/[slug]",
    "/signup/[slug]",
    "/signups",
    "/signups/[id]",
    "/signups/[slug]",
  ],
};
