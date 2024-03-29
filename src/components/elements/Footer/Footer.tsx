import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-10 w-full bg-slate-100">
      <div className="flex h-full justify-between px-4 py-2 md:flex md:items-center md:px-10">
        <div className="mb-2 md:mb-0">
          <p className="font-primary text-sm text-gray-800">wupzy@wupzy.com</p>
        </div>
        <div className="flex flex-col justify-between text-right md:flex-row md:space-x-5">
          <Link
            href="/privacy-policy"
            className="text-sm font-normal text-gray-800"
          >
            Privacy Policy
          </Link>
          <Link
            href="/cookie_consent"
            className="text-sm font-normal text-gray-800"
          >
            Cookie Consent
          </Link>
          <Link
            href="/terms-of-service"
            className="text-sm font-normal text-gray-800"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
