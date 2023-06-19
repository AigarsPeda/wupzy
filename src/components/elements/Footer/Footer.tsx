import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-10 h-14 w-full bg-slate-100">
      <div className="h-full items-center justify-between px-10 py-2 md:flex">
        <div className="mb-2 md:mb-0">
          <p className="font-primary text-gray-800">wupzy@wupzy.com</p>
        </div>
        <div className="flex justify-between">
          <Link href="/terms-of-service" className="font-normal text-gray-800">
            Terms of Service
          </Link>
          <Link
            href="/cookie_consent"
            className="ml-6 font-normal text-gray-800"
          >
            Cookie Consent
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
