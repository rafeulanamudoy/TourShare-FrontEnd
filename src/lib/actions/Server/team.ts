"use server";

import { ICreateTeam } from "@/types/ICreateTeal";
import { revalidateTag } from "next/cache";

export async function createTeam(data: ICreateTeam) {
  //console.log(data, "create team data");
  try {
    const response = await fetch(`${process.env.URL}/team`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    revalidateTag("team");

    return result;
  } catch (error) {
    //console.log(error, "from team.ts");
    throw error;
  }
}
export async function getTeams() {
  try {
    const response = await fetch(`${process.env.URL}/team`, {
      next: { tags: ["team"] },
    });

    const data = await response.json();
    return data;
    // Parse JSON response
  } catch (error) {
    throw error;
  }
}
