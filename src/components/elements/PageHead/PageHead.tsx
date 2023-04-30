import Head from "next/head";
import { useRouter } from "next/router";
import type { FC } from "react";

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
  const router = useRouter();

  return (
    <Head>
      <title>{title}</title>
      <meta charSet="UTF-8" />

      <meta name="robots" content="follow, index" />

      <meta name="description" content={descriptionLong} />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta property="og:description" content={descriptionShort} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta property="twitter:title" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content="/logo_photo.jpg" />
      <meta property="twitter:description" content={descriptionShort} />

      <meta property="og:title" content={title} />
      <meta property="og:image" content="/logo_photo.jpg" />
      <meta property="og:url" content={`www.wupzy.com${router.asPath}`} />

      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/site.webmanifest" />
      <link
        sizes="180x180"
        rel="apple-touch-icon"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        sizes="32x32"
        type="image/png"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        sizes="16x16"
        type="image/png"
        href="/favicon-16x16.png"
      />
    </Head>
  );
};

export default PageHead;
