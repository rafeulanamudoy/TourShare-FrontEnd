"use server";

import { ICreateMessage } from "@/src/types/IMessage";

export async function getMessages(senderId: string, recipientId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FULL_URL}/messages?senderId=${senderId}&recipientId=${recipientId}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createMessage(data: ICreateMessage) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FULL_URL}/messages`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}
