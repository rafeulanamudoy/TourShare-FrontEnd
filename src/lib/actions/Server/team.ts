"use server";

import { IAccept, ICreateTeam } from "@/src/types/ICreateTeam";
import { IJoinTeam } from "@/src/types/IJoinTeam";
import { revalidateTag } from "next/cache";

export async function createTeam(data: ICreateTeam) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_FULL_URL}/team`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    revalidateTag("teams");

    return result;
  } catch (error) {
    throw error;
  }
}
export async function getTeams() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_FULL_URL}/team`, {
      next: { tags: ["teams", "updateTeam", "acceptTeam", "deleteTeam"] },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
export async function getSingleTeamByEmail(email: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FULL_URL}/team/email/${email}`,
      {
        cache: "no-store",
        next: {
          tags: [
            "updateTeam",
            "teams",
            "acceptTeam",
            "joinTeam",
            "deleteJoinTeam",
            "deleteTeam",
          ],
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getSingleTeamById(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FULL_URL}/team/id/${id}`,
      {
        cache: "no-store",
        next: {
          tags: [
            "updateTeam",
            "teams",
            "acceptTeam",
            "joinTeam",
            "deleteJoinTeam",
            "deleteTeam",
          ],
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
export async function updateSingleTeam(id: string, data: Partial<ICreateTeam>) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FULL_URL}/team/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    revalidateTag("updateTeam");

    return result;
  } catch (error) {}
}
export async function createJoinTeam(data: IJoinTeam) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FULL_URL}/joinTeam`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    revalidateTag("joinTeam");

    return result;
  } catch (error) {
    throw error;
  }
}
export async function getJoinTeams() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FULL_URL}/joinTeam`,
      {
        cache: "no-store",
        next: { tags: ["joinTeam", "updateJoinTeam"] },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
export async function getSingleJoinTeam(email: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FULL_URL}/joinTeam/${email}`,
      {
        next: {
          tags: ["joinTeam", "updateJoinTeam", "deleteJoinTeam", "acceptTeam"],
        },
      }
    );

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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FULL_URL}/joinTeam/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    revalidateTag("updateJoinTeam");

    return result;
  } catch (error) {}
}
export async function deleteSingleJoinTeam(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FULL_URL}/joinTeam/${id}`,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
    revalidateTag("deleteJoinTeam");

    return result;
  } catch (error) {}
}
export async function deleteSingleTeam(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FULL_URL}/team/${id}`,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
    revalidateTag("deleteTeam");

    return result;
  } catch (error) {}
}
export async function acceptJoinTeam(id: string, data: IAccept) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FULL_URL}/team/accept/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    revalidateTag("acceptTeam");

    return result;
  } catch (error) {}
}
