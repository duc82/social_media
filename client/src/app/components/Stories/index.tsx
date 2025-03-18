"use client";

import { UserStory } from "@/app/types/story";
import Image from "next/image";
import { useState } from "react";
import StoryModal from "./StoryModal";
import { formatDateTime } from "@/app/utils/dateTime";

export default function Stories({
  initialUserStories,
}: {
  initialUserStories: UserStory[];
}) {
  const [userStories, setUserStories] = useState(initialUserStories);
  const [currentStory, setCurrentStory] = useState<UserStory | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = (userStory: UserStory) => {
    setCurrentStory(userStory);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const onClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <StoryModal
        isOpen={isOpen}
        onClose={onClose}
        stories={currentStory?.stories.map((story) => ({
          url: story.content,
          type: story.type,
          header: {
            heading: currentStory?.fullName,
            subheading: formatDateTime(story.createdAt),
            profileImage: currentStory?.profile.avatar,
          },
          duration: 5000,
        }))}
      />
      <div className="stories" id="stories">
        {userStories.map((userStory) => (
          <div className="story" id={userStory.id} key={userStory.id}>
            <button
              type="button"
              className="item"
              onClick={() => onOpen(userStory)}
            >
              <Image
                src={
                  userStory.stories[0].type === "video"
                    ? userStory.profile.avatar
                    : userStory.stories[0].content
                }
                alt={userStory.fullName}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
              <span className="info">
                <strong className="name">{userStory.fullName}</strong>
              </span>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
