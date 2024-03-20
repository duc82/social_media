"use client";

import { Zuck } from "zuck.js";
import { useEffect, useRef } from "react";

const timestamp = function () {
  let timeIndex = 0;
  const shifts = [
    35,
    60,
    60 * 3,
    60 * 60 * 2,
    60 * 60 * 25,
    60 * 60 * 24 * 4,
    60 * 60 * 24 * 10,
  ];

  const shift = shifts[timeIndex++] || 0;
  const date = new Date(Date.now() - shift * 1000);

  return date.getTime() / 1000;
};

export default function Stories() {
  const storiesRef = useRef(null);

  useEffect(() => {
    const el = storiesRef.current;
    if (!el) return;

    Zuck(el, {
      backNative: false, // uses window history to enable back button on browsers/android
      previousTap: true, // use 1/3 of the screen to navigate to previous item when tap the story
      skin: "snapgram", // container class
      autoFullScreen: false, // enables fullscreen on mobile browsers
      avatars: true, // shows user photo instead of last story item preview
      list: false, // displays a timeline instead of carousel
      openEffect: true, // enables effect when opening story
      cubeEffect: true, // enables the 3d cube effect when sliding story
      backButton: true,
      localStorage: true, // enabled localStorage
      stories: [
        {
          id: "1",
          photo: "/01.jpg",
          name: "John Doe",
          time: timestamp(),
          items: [
            {
              id: "story-1",
              type: "photo",
              length: 5,
              name: "John Doe",
              src: "/01.jpg",
              time: timestamp(),
            },
          ],
        },
      ],
    });
  }, []);

  return <div id="stories" ref={storiesRef} className="storiesWrapper"></div>;
}
