import "../styles/globals.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="NavBar flex items-center justify-center w-full fixed top-0 left-0 z-100">
      <nav className="w-4/5 bg-[#ff9f1c] rounded-2xl px-4 flex items-center justify-between relative">
        <div className="nav__content w-full flex justify-between">
          <div className="logo">
            <Link href="/">Rahul Compani</Link>
          </div>
          <label htmlFor="check" className="hidden">
            <i className="ri-menu-line"></i>
          </label>
          <input type="checkbox" name="check" id="check" className="hidden"/>
          <ul>
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
              <Link href="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
