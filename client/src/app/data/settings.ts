import person_outline_filled from "@/app/assets/images/person-outline-filled.svg";
import notification_outlined_filled from "@/app/assets/images/notification-outlined-filled.svg";
import handshake_outline_filled from "@/app/assets/images/handshake-outline-filled.svg";
import trash_var_outline_filled from "@/app/assets/images/trash-var-outline-filled.svg";

export const settings = [
  {
    title: "Account",
    icon: person_outline_filled,
    href: "/settings",
  },
  {
    title: "Notification",
    icon: notification_outlined_filled,
    href: "/settings/notification",
  },
  {
    title: "Blocking",
    icon: handshake_outline_filled,
    href: "/settings/blocking",
  },
  {
    title: "Close account",
    icon: trash_var_outline_filled,
    href: "/settings/close-account",
  },
];
