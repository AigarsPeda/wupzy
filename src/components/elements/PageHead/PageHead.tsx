import type { FC } from "react";
import Head from "next/head";

interface PageHeadProps {
  title: string;
  descriptionLong: string;
  descriptionShort: string;
}

const PageHead: FC<PageHeadProps> = ({
  title,
  descriptionLong,
  descriptionShort,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={descriptionLong} />
      <meta property="og:description" content={descriptionShort} />
      <meta charSet="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:image" content="/logo_photo.jpg" />
      <meta name="robots" content="follow, index" />
      <meta property="og:title" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:description" content={descriptionShort} />
      <meta property="twitter:image" content="/logo_photo.jpg" />
      <meta property="twitter:title" content={title} />

      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
};

export default PageHead;
