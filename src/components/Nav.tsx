import Link from "next/link";
import { useRef, useState } from "react";
import navIcon from "../assets/navicon.png";
import Image from "next/image";

export default function Navbar() {
  const contactRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="NavBar flex items-center justify-center w-full fixed top-0 left-0 z-[100]">
      <nav className="w-4/5 rounded-2xl px-4 flex items-center justify-between relative bg-[#eeeeee] border border-gray-800">
        <div className="nav__content w-full flex justify-between items-center">
          <div className="logo text-white">
            <Link href="/">Rahul Compani</Link>
          </div>
          <div
            className="menu md:hidden text-white cursor-pointer"
            onClick={toggleMenu}
          >
            <Image
              src={navIcon}
              height="40"
              width="40"
              alt="menu icon"
              className="nav-icon bg-white rounded-3xl"
            />
          </div>
          <ul className="hidden md:flex space-x-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link href="/beyondwork">Beyond Work</Link>
            </li>
            <li>
              <a href="/Resume_RahulCompani.pdf" download>
                Resume
              </a>
            </li>
          </ul>
        </div>
        {menuOpen && (
          <ul className="absolute rounded-xl right-0 top-full w-1/2 bg-black text-white flex flex-col items-center space-y-4 p-2 pb-4 md:hidden">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link href="/beyondwork">Beyond Work</Link>
            </li>
            <li>
              <a href="/Resume_RahulCompani.pdf" download>
                Resume
              </a>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}
