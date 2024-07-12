"use server";

import { IContactData } from "@/src/types/IContact";
import { revalidateTag } from "next/cache";

export async function getContacts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FULL_URL}/contact`,
      {
        next: {
          tags: ["contact"],
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createContact(data: IContactData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FULL_URL}/contact`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    revalidateTag("contact");

    return result;
  } catch (error) {
    throw error;
  }
}
