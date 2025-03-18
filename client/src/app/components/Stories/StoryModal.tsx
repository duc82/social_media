"use client";

import clsx from "clsx";
import Stories from "react-insta-stories";

interface Story {
  url: string;
  type: string;
  header?: {
    heading: string;
    subheading: string;
    profileImage: string;
  };
  duration?: number;
}

export default function StoryModal({
  stories,
  isOpen,
  onClose,
}: {
  stories?: Story[];
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div className={clsx("story-modal", isOpen && "show")} id="storyModal">
      <div className="modal-content">
        <button type="button" className="close" onClick={onClose}>
          ×
        </button>
        {stories && isOpen && (
          <Stories
            stories={stories}
            defaultInterval={3000}
            width={640}
            height={"100%"}
            onAllStoriesEnd={onClose}
            keyboardNavigation={true}
          />
        )}
      </div>
    </div>
  );
}
