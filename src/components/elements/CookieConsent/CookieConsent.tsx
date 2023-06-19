import type { FC } from "react";

const CookieConsent: FC = () => {
  return (
    <div className="mt-10">
      <h1 className="text-2xl">Cookie Consent</h1>
      <p className="mb-4">Last updated: May 31, 2023</p>
      <p className="font-semibold text-gray-900">
        We use cookies to provide you with the best possible experience on our
        website. By clicking &quot;Accept,&quot; you consent to the use of
        cookies as described in this notice.
      </p>
      <p className="mb-2 mt-5 text-lg font-bold text-gray-900">
        What are cookies?
      </p>
      <p className="mb-2 mt-5 text-gray-900">
        Cookies are small text files that are placed on your device when you
        visit a website. They are widely used to make websites work more
        efficiently and to provide information to website owners.
      </p>
      <p className="mb-2 mt-5 text-lg font-bold text-gray-900">
        Why do we use cookies?
      </p>
      <p className="mb-2 mt-5 text-lg font-bold text-gray-900">
        We use cookies for various purposes, including:
      </p>
      <ul className="text-gray-900">
        <li className="my-2 font-normal text-gray-900">
          Essential Cookies: These cookies are necessary for the website to
          function properly. They enable basic features such as page navigation
          and access to secure areas of the website.
        </li>
      </ul>
      <p className="mb-2 mt-5 text-lg font-bold text-gray-900">
        What types of cookies do we use?
      </p>
      <ul>
        <li className="my-2 font-normal text-gray-900">
          First-Party Cookies: These cookies are set by our website and are
          essential for its operation.
        </li>
        <li className="my-2 font-normal text-gray-900">
          Third-Party Cookies: We also use third-party cookies provided by
          trusted partners to analyze website usage, deliver targeted
          advertisements, and enable social media sharing.
        </li>
      </ul>
    </div>
  );
};

export default CookieConsent;
