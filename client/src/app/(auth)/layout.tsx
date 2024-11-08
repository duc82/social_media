import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareTwitter,
  faLinkedin,
  faSquareYoutube,
} from "@fortawesome/free-brands-svg-icons";
import AuthDecoration from "../components/Decoration/AuthDecoration";
import BackgroundDecoration from "../components/Decoration/BackgroundDecoration";
import { auth } from "../api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <>
      <main className="bg-primary pt-5 pb-0 position-relative">
        <div className="m-0 position-absolute top-50 start-50 translate-middle w-100 h-100 opacity-10 overflow-hidden">
          <BackgroundDecoration />
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <h1 className="display-4 text-white mb-4 position-relative">
                Welcome back!
              </h1>
              <div className="m-0 position-relative z-2">
                <AuthDecoration />
              </div>
            </div>

            <div className="col-sm-10 col-md-8 col-lg-6 position-relative z-1">
              {children}
            </div>
          </div>
        </div>
      </main>

      <footer className="pt-5 pb-2 pb-sm-4 position-relative bg-mode">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-10 col-md-8 col-lg-6">
              <div className="d-grid d-sm-flex justify-content-center justify-content-sm-between align-items-center mt-3">
                {/* Nav */}
                <ul className="nav">
                  <li className="nav-item">
                    <Link
                      href="/privacy-terms"
                      className="nav-link fw-bold ps-0 pe-2"
                    >
                      Terms
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/privacy-terms"
                      className="nav-link fw-bold pe-2"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/cookies" className="nav-link fw-bold pe-2">
                      Cookies
                    </Link>
                  </li>
                </ul>

                {/* Social icon */}
                <ul className="nav justify-content-center justify-content-sm-end">
                  <li className="nav-item">
                    <Link
                      href="https://www.facebook.com"
                      target="_blank"
                      className="nav-link px-2 fs-5"
                    >
                      <FontAwesomeIcon icon={faSquareFacebook} />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="https://www.twitter.com"
                      target="_blank"
                      className="nav-link px-2 fs-5"
                    >
                      <FontAwesomeIcon icon={faSquareTwitter} />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="https://www.linkedin.com"
                      target="_blank"
                      className="nav-link px-2 fs-5"
                    >
                      <FontAwesomeIcon icon={faLinkedin} />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="https://www.youtube.com"
                      target="_blank"
                      className="nav-link px-2 fs-5"
                    >
                      <FontAwesomeIcon icon={faSquareYoutube} />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
