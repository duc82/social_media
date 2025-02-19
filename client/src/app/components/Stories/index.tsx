"use client";

import { Zuck } from "zuck.js";
import { useEffect, useRef, useState } from "react";
import { UserStory } from "@/app/types/story";

const timestamp = () => {
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

export default function Stories({
  initialUserStories,
}: {
  initialUserStories: UserStory[];
}) {
  const [userStories, setUserStories] =
    useState<UserStory[]>(initialUserStories);
  const storiesRef = useRef<HTMLDivElement | null>(null);
  const zuckObjectRef = useRef<ZuckObject | null>(null);

  useEffect(() => {
    const el = storiesRef.current;
    if (!el) return;

    const zuckObject = Zuck(el, {
      backNative: true, // uses window history to enable back button on browsers/android
      previousTap: true, // use 1/3 of the screen to navigate to previous item when tap the story
      skin: "snapgram", // container class
      autoFullScreen: true, // enables fullscreen on mobile browsers
      avatars: false, // shows user photo instead of last story item preview
      list: false, // displays a timeline instead of carousel
      openEffect: true, // enables effect when opening story
      cubeEffect: true, // enables the 3d cube effect when sliding story
      backButton: true, // adds a back button to close the story viewer
      localStorage: true, // enabled localStorage
      stories: userStories.map((user) => ({
        id: user.id,
        photo: user.profile.avatar,
        name: user.fullName,
        time: timestamp(),
        items: user.stories.map((story) => ({
          id: story.id,
          type: story.type === "image" ? "photo" : "video",
          length: 5,
          src: story.content,
          preview: story.content,
          time: timestamp(),
        })),
      })),
    });
    zuckObjectRef.current = zuckObject;
  }, []);

  return <div id="stories" ref={storiesRef} className="storiesWrapper"></div>;
}
