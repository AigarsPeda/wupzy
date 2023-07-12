const siteUrl = "https://www.wupzy.com";
module.exports = {
  siteUrl,
  exclude: ["/404"],
  generateRobotsTxt: true,
  exclude: [
    "/signup",
    "/tournaments",
    "/login/forgot",
    "/new-tournament",
    "/share/[slug]",
  ],
};
