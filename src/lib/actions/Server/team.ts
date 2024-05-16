"use server";

import { ICreateTeam } from "@/types/ICreateTeal";

export async function createTeam(data: ICreateTeam) {
  console.log(data, "create team data");
  try {
    const response = await fetch(`${process.env.URL}/createTeam`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result?.success) {
      return result;
    }
  } catch (error) {
    throw error;
  }
}
