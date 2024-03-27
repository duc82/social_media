"use client";

import { useEffect, useState } from "react";
import GLightboxContext from "../context/GLightboxContext";

export default function GLightboxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [glightbox, setGLightbox] = useState<any>(null);

  useEffect(() => {
    const GLightbox = require("glightbox/dist/js/glightbox.min.js");

    const lightbox = GLightbox({
      selector: "[data-glightbox]",
      openEffect: "fade",
      touchFollowAxis: "true",
      closeEffect: "fade",
    });

    setGLightbox(lightbox);
  }, []);

  return (
    <GLightboxContext.Provider value={glightbox}>
      {children}
    </GLightboxContext.Provider>
  );
}
