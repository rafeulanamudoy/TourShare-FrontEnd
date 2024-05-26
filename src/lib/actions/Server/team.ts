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
      next: { tags: ["teams", "updateTeam"] },
    });

    const data = await response.json();
    // console.log(data, "check data from server");
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getSingleTeamByEmail(email: string) {
  console.log(email, "check email");
  try {
    const response = await fetch(`${process.env.URL}/team/email/${email}`, {
      next: { tags: ["updateTeam", "teams"] },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getSingleTeamById(id: string) {
  try {
    const response = await fetch(`${process.env.URL}/team/id/${id}`, {
      next: { tags: ["updateTeam", "teams"] },
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
export async function createJoinTeam(data: IJoinTeam) {
  //console.log(data, "create team data");
  try {
    const response = await fetch(`${process.env.URL}/joinTeam`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    revalidateTag("joinTeam");

    return result;
  } catch (error) {
    // console.log(error, "from team.ts");
    throw error;
  }
}
export async function getJoinTeams() {
  try {
    const response = await fetch(`${process.env.URL}/joinTeam`, {
      cache: "no-store",
      next: { tags: ["joinTeam", "updateJoinTeam"] },
    });

    const data = await response.json();
    // console.log(data, "check data from server");
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getSingleJoinTeam(email: string) {
  try {
    const response = await fetch(`${process.env.URL}/joinTeam/${email}`, {
      next: { tags: ["joinTeam", "updateJoinTeam", "deleteJoinTeam"] },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
export async function updateSingleJoinTeam(
  id: string,
  data: Partial<IJoinTeam>
) {
  try {
    const response = await fetch(`${process.env.URL}/joinTeam/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    revalidateTag("updateJoinTeam");
    //console.log(result);
    return result;
  } catch (error) {
    // console.log(error, "update user error from  user.ts server file");
  }
}
export async function deleteSingleJoinTeam(id: string) {
  try {
    const response = await fetch(`${process.env.URL}/joinTeam/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    revalidateTag("deleteJoinTeam");
    console.log(result);
    return result;
  } catch (error) {
    console.log(error, "update user error from  user.ts server file");
  }
}
