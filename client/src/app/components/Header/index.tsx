import Image from "next/image";
import Link from "next/link";
import HeaderMenu from "./HeaderMenu";
import getServerSession from "@/app/libs/session";
import HeaderSearch from "./HeaderSearch";
import logo from "@/app/assets/images/logo.svg";
import HeaderMenuRight from "./HeaderMenuRight";
import conversationService from "@/app/services/conversationService";

export default async function Header() {
  const { currentUser, token } = await getServerSession();

  const conversationUnread = await conversationService.countUnread(token, [
    "headerConversationUnread",
  ]);

  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-mode">
      <div className="container">
        {/* Logo */}
        <Link href="/" className="navbar-brand">
          <Image src={logo} alt="Logo" width={36} height={36} />
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
          <div className="nav mt-3 mt-lg-0 flex-nowrap align-items-center px-4 px-lg-0">
            <HeaderSearch token={token} />
          </div>

          <HeaderMenu />
        </div>

        <HeaderMenuRight
          currentUser={currentUser}
          conversationUnread={conversationUnread}
        />
      </div>
    </nav>
  );
}
