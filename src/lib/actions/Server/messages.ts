"use server";

import { ICreateMessage } from "@/types/IMessage";
import { revalidateTag } from "next/cache";

export async function getMessages(senderId: string, recipientId: string) {
  try {
    const response = await fetch(
      `${process.env.URL}/messages?senderId=${senderId}&recipientId=${recipientId}`,
      {
        cache: "no-store",
        next: { tags: ["privateMessage"] },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createMessage(data: ICreateMessage) {
  //console.log(data, "create team data");
  try {
    const response = await fetch(`${process.env.URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    revalidateTag("privateMessage");

    return result;
  } catch (error) {
    // console.log(error, "from team.ts");
    throw error;
  }
}
