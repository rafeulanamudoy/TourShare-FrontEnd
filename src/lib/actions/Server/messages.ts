"use server";

export async function getMessages(senderId: string, recipientId: string) {
  try {
    const response = await fetch(
      `${process.env.URL}/messages?senderId=${senderId}&recipientId=${recipientId}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
