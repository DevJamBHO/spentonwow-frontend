import {apiFetch} from "@/utils/apiService";
import {NotificationResponse} from "@/interfaces/Notifications";

export const hasNotification = async (): Promise<NotificationResponse | null> => {


    return apiFetch(`/notifications`)


}