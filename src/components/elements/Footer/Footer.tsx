import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-10 h-20 w-full bg-gray-800">
      <div className="flex h-full items-center justify-end px-10">
        <div className="">
          <Link href="/terms-of-service" className="ml-2 text-white">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
