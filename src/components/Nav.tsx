import "./nav.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="NavBar">
      <nav>
        <div className="nav__content">
          <div className="logo">
            <Link href="/">Rahul Compani</Link>
          </div>
          <label htmlFor="check" className="checkbox">
            <i className="ri-menu-line"></i>
          </label>
          <input type="checkbox" name="check" id="check" />
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
