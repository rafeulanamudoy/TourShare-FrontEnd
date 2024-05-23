"use server";

import { ICreateTeam } from "@/types/ICreateTeam";
import { IJoinTeam } from "@/types/IJoinTeam";
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
    revalidateTag("teams");

    return result;
  } catch (error) {
    // console.log(error, "from team.ts");
    throw error;
  }
}
export async function getTeams() {
  try {
    const response = await fetch(`${process.env.URL}/team`, {
      cache: "no-store",
      next: { tags: ["teams"] },
    });

    const data = await response.json();
    // console.log(data, "check data from server");
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getSingleTeam(email: string) {
  try {
    const response = await fetch(`${process.env.URL}/team/${email}`, {
      next: { tags: ["updateTeam"] },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
export async function updateSingleTeam(id: string, data: Partial<ICreateTeam>) {
  try {
    const response = await fetch(`${process.env.URL}/team/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    revalidateTag("updateTeam");
    //console.log(result);
    return result;
  } catch (error) {
    // console.log(error, "update user error from  user.ts server file");
  }
}
export async function joinTeam(data: IJoinTeam) {
  //console.log(data, "create team data");
  try {
    const response = await fetch(`${process.env.URL}/joinTeam`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    // revalidateTag("joinTeam");

    return result;
  } catch (error) {
    // console.log(error, "from team.ts");
    throw error;
  }
}
