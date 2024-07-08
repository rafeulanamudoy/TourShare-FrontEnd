"use server";

import { IContactData } from "@/types/IContact";

import { revalidateTag } from "next/cache";

export async function getContacts() {
  try {
    const response = await fetch(`${process.env.URL}/contact`, {
      next: {
        tags: ["contact"],
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createContact(data: IContactData) {
  //console.log(data, "create team data");
  try {
    const response = await fetch(`${process.env.URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    revalidateTag("contact");

    return result;
  } catch (error) {
    // console.log(error, "from team.ts");
    throw error;
  }
}