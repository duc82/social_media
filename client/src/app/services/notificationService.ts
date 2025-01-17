import { NotificationSettings } from "../types/notification";
import apiRequest from "./api";

const notificationService = {
  async getSettings(token: string) {
    return apiRequest<NotificationSettings>("/notifications/settings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default notificationService;
