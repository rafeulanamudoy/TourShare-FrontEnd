"use server";

export async function getUserNotification(
  sender: string,
  type: string,
  status: string
) {
  try {
    const response = await fetch(
      `${process.env.URL}/notification?sender=${sender}&status=${status}&type=${type}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
