const siteUrl = process.env.NEXT_PUBLIC_APP_DOMAIN || "";
module.exports = {
  siteUrl,
  exclude: ["/404"],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/404"],
      },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [
      `https://${siteUrl}/sitemap.xml`,
      // `${siteUrl}server-sitemap.xml`,
    ],
  },
};
