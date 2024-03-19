"use server";

export async function signUp(data: FormData, role: string) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/${role}/signUp`,
      {
        method: "POST",
        headers: {},
        body: data,
      }
    );
    const result = await response.json();
    return result;
    //console.log(result, "from signup server action");
  } catch (error) {
    throw error;
  }
}
