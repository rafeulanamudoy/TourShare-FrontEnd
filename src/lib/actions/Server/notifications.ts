"use server";

import { NotificationPayload } from "@/src/types/INotification";
import { revalidateTag } from "next/cache";

export async function getAllUserNotification(user: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FULL_URL}/notification?recipient=${user}`
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
      `${process.env.NEXT_PUBLIC_FULL_URL}/notification?recipient=${user}&status=${status}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createUserNotification(data: NotificationPayload) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FULL_URL}/notification`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    revalidateTag("notification");

    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateNotificationStatus(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FULL_URL}/notification/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      }
    );
    const result = await response.json();
    revalidateTag("updateNotification");

    return result;
  } catch (error) {
    throw error;
  }
}
