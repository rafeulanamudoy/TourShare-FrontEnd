"use server";

import { INotification } from "@/types/INotification";
import { revalidateTag } from "next/cache";

export async function getUserNotification(
  sender: string,
  type: string,
  status: string
) {
  try {
    const response = await fetch(
      `${process.env.URL}/notification?sender=${sender}&status=${status}&type=${type}`,

      { cache: "no-store", next: { tags: ["messageNotification"] } }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createUserNotification(data: INotification) {
  //console.log(data, "create team data");
  try {
    const response = await fetch(`${process.env.URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    revalidateTag("messageNotification");

    return result;
  } catch (error) {
    // console.log(error, "from team.ts");
    throw error;
  }
}
