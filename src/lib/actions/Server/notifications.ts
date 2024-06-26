"use server";

import { NotificationPayload } from "@/types/INotification";
import { revalidateTag } from "next/cache";

export async function getAllUserNotification(user: string) {
  try {
    const response = await fetch(
      `${process.env.URL}/notification?recipient=${user}`

      // { next: { tags: ["notification", "updateNotification"] } }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getStatusNotification(user: string, status: string) {
  try {
    const response = await fetch(
      `${process.env.URL}/notification?recipient=${user}&status=${status}`

      // { next: { tags: ["notification", "updateNotification"] } }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createUserNotification(data: NotificationPayload) {
  //console.log(data, "create team data");
  try {
    const response = await fetch(`${process.env.URL}/notification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    revalidateTag("notification");

    return result;
  } catch (error) {
    // console.log(error, "from team.ts");
    throw error;
  }
}

export async function updateNotificationStatus(id: string) {
  //console.log(data, "create team data");
  try {
    const response = await fetch(`${process.env.URL}/notification/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    revalidateTag("updateNotification");

    return result;
  } catch (error) {
    // console.log(error, "from team.ts");
    throw error;
  }
}
