import {
  Bell,
  ChatLeftText,
  FilePost,
  HouseDoor,
  Icon,
  People,
} from "react-bootstrap-icons";

interface Menu {
  label: string;
  href?: string;
  icon?: Icon;
  children?: Menu[];
}

export const menus: Menu[] = [
  {
    icon: HouseDoor,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: People,
    label: "Users",
    children: [
      {
        label: "Overview",
        href: "/users",
      },
      {
        label: "Add User",
        href: "/users/add",
      },
      {
        label: "Recycle Bin",
        href: "/users/recycle-bin",
      },
    ],
  },
  {
    icon: FilePost,
    label: "Posts",
    children: [
      {
        label: "Overview",
        href: "/posts",
      },
      {
        label: "Add Post",
        href: "/posts/add",
      },
      {
        label: "Recycle Bin",
        href: "/posts/recycle-bin",
      },
    ],
  },
  {
    icon: ChatLeftText,
    label: "Messages",
    children: [
      {
        label: "Overview",
        href: "/messages",
      },
      {
        label: "Add Message",
        href: "/messages/add",
      },
      {
        label: "Recycle Bin",
        href: "/messages/recycle-bin",
      },
    ],
  },
  {
    icon: Bell,
    label: "Notifications",
    children: [
      {
        label: "Overview",
        href: "/notifications",
      },
      {
        label: "Add Notification",
        href: "/notifications/add",
      },
      {
        label: "Recycle Bin",
        href: "/notifications/recycle-bin",
      },
    ],
  },
];
