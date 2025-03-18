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

  async updateSettings(token: string, data: Partial<NotificationSettings>) {
    return apiRequest<NotificationSettings>("/notifications/update/settings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  },
};

export default notificationService;
