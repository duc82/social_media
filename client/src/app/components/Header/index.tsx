import Image from "next/image";
import Link from "next/link";
import Avatar from "../Avatar";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        {/* Logo */}
        <Link href="/" className="navbar-brand">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        </Link>

        {/* Menu */}
        <button
          type="button"
          title="Menu"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          className="navbar-toggler ms-auto icon-md btn btn-light p-0 collapsed"
        >
          <span className="navbar-toggler-animation">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Collapse */}
        <div className="navbar-collapse collapse" id="navbarCollapse">
          {/* Nav Search */}
          <div className="nav mt-3 mt-lg-0 flex-nowrap align-items-center px-4 px-lg-0">
            <form className="position-relative w-100">
              <input
                type="search"
                className="form-control ps-5 bg-light"
                placeholder="Search..."
                aria-label="Search"
              />
              <button
                type="submit"
                className="position-absolute top-50 start-0 btn bg-transparent px-2 py-0 translate-middle-y"
              >
                <i className="bi bi-search fs-5"></i>
              </button>
            </form>
          </div>

          <ul className="navbar-nav navbar-nav-scroll ms-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/friends" className="nav-link">
                Friends
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/groups" className="nav-link">
                Groups
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
