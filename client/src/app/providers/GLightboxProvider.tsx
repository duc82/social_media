"use client";

import { useEffect } from "react";

export default function GLightboxProvider() {
  useEffect(() => {
    const GLightbox = require("glightbox/dist/js/glightbox.min.js");

    const lightBox = GLightbox({
      selector: "[data-glightbox]",
      openEffect: "fade",
      touchFollowAxis: "true",
      closeEffect: "fade",
    });
  }, []);

  return null;
}
