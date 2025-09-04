import { Separator } from "@/components/ui/separator";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";



const Footer05Page = () => {
  return (
    <footer>
      <div className="max-w-screen-xl mx-auto pt-24 ">
        <div className="py-12 flex flex-col justify-start items-center">
          {/* Logo */}
          <div className="flex flex-row">
            <svg
              width="32"
              height="32"
              viewBox="0 0 240 240"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                stroke="#111"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              >
                <path d="M120 220 C120 220 190 160 190 110 C190 70 160 40 120 40 C80 40 50 70 50 110 C50 160 120 220 120 220 Z" />
                <path d="M85 120 L120 95 L155 120" />
                <rect x="95" y="120" width="50" height="40" rx="6" />
                <line x1="120" y1="120" x2="120" y2="160" />
              </g>
            </svg>
            <h1 className="font-bold text-2xl text-primary">Rent<span className="font-light">ease</span></h1>
          </div>
          <ul className="mt-6 flex items-center">
              A simple rental system using Next.js, Shadcn, and AWS
          </ul>
        </div>
        <Separator />
        <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
          {/* Copyright */}
          <span className="text-muted-foreground">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/" target="_blank">
              Reniel Peruda
            </Link>
            . All rights reserved.
          </span>

          <div className="flex items-center gap-5 text-muted-foreground">
            <a href="https://www.facebook.com/niel.peruda" aria-label="facebook" className="hover:text-gray-500">
              <FontAwesomeIcon icon={faFacebook} className="h6 w-6" />
            </a>
            <a href="https://www.instagram.com/peruducks/" aria-label="instagram" className="hover:text-gray-500">
              <FontAwesomeIcon icon={faInstagram} className="h6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/reniel-peruda-14106a346" aria-label="linkedin" className="hover:text-gray-500">
              <FontAwesomeIcon icon={faLinkedin} className="h6 w-6" />
            </a>
            <a href="https://github.com/Nielperudaks" aria-label="github" className="hover:text-gray-500">
              <FontAwesomeIcon icon={faGithub} className="h6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer05Page;
